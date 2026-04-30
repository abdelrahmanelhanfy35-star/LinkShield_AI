import re
from urllib.parse import urlparse


def extract_features(url: str) -> dict:
    """Extract security-relevant features from a URL."""
    features = {}
    
    # Normalize URL
    if not re.match(r'^https?://', url, re.IGNORECASE):
        url = 'http://' + url
    
    # URL length
    features['url_length'] = len(url)
    
    # Has @ symbol (used for credential injection / redirects)
    features['has_at_symbol'] = 1 if '@' in url else 0
    
    # Number of dots
    features['num_dots'] = url.count('.')
    
    # HTTPS usage
    features['has_https'] = 1 if url.startswith('https://') else 0
    
    # IP address detection
    ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
    features['has_ip_address'] = 1 if re.search(ip_pattern, url) else 0
    
    # Domain and path extraction
    try:
        parsed = urlparse(url)
        domain = parsed.netloc
        path = parsed.path
        
        features['domain_length'] = len(domain)
        features['path_length'] = len(path)
        
        # Subdomain detection (count dots in domain, excluding TLD)
        features['has_subdomain'] = 1 if domain.count('.') > 1 else 0
    except:
        features['domain_length'] = 0
        features['path_length'] = 0
        features['has_subdomain'] = 0
    
    # Suspicious words
    suspicious_words = ['login', 'verify', 'bank', 'account', 'update', 'confirm', 
                        'secure', 'signin', 'password', 'credential', 'auth', 'validate',
                        'authenticate', 'wallet', 'crypto', 'bitcoin', 'verify-now']
    features['has_suspicious_words'] = 1 if any(word in url.lower() for word in suspicious_words) else 0
    
    # URL shortening services
    shortening_services = ['bit.ly', 'tinyurl', 't.co', 'goo.gl', 'ow.ly', 
                           'short.link', 'is.gd', 'buff.ly', 'shorturl', 'rebrand.ly']
    features['has_shortening_service'] = 1 if any(svc in url.lower() for svc in shortening_services) else 0
    
    # Hyphen count
    features['num_hyphens'] = url.count('-')
    
    # Slash count
    features['num_slashes'] = url.count('/')
    
    return features


def get_reasons(features: dict, prediction: str) -> list:
    """Generate human-readable reasons based on extracted features."""
    reasons = []
    
    if features.get('has_ip_address', 0) == 1:
        reasons.append("Contains IP address instead of domain name")
    if features.get('url_length', 0) > 75:
        reasons.append(f"URL is too long ({features['url_length']} characters)")
    if features.get('has_at_symbol', 0) == 1:
        reasons.append("Contains @ symbol (potential redirect trap)")
    if features.get('has_https', 0) == 0:
        reasons.append("No HTTPS encryption - data transmitted insecurely")
    if features.get('has_suspicious_words', 0) == 1:
        reasons.append("Contains suspicious keywords (login, verify, bank)")
    if features.get('has_shortening_service', 0) == 1:
        reasons.append("Uses URL shortening service (hides true destination)")
    if features.get('num_dots', 0) > 3:
        reasons.append(f"Excessive dots in URL ({features['num_dots']} detected)")
    if features.get('num_hyphens', 0) > 3:
        reasons.append(f"Multiple hyphens detected ({features['num_hyphens']})")
    if features.get('has_subdomain', 0) == 1:
        reasons.append("Multiple subdomains (potential spoofing)")
    if features.get('domain_length', 0) > 30:
        reasons.append(f"Unusually long domain name ({features['domain_length']} chars)")
    if features.get('path_length', 0) > 50:
        reasons.append(f"Very long URL path ({features['path_length']} chars)")
    
    if not reasons:
        if prediction == 'Safe':
            reasons.append("URL structure appears legitimate")
            reasons.append("Uses secure HTTPS connection")
        else:
            reasons.append("Pattern matches known malicious URLs")
    
    return reasons

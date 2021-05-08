export const authenticated = () => {
    const isAuth = true;
    
    return new Promise((resolve) => {
        resolve(isAuth);
    });
};

export const authorized = (authorities) => {
    if (!Array.isArray(authorities)) {
        authorities = [authorities];
    }
    
    const userAuthorities = ['ROLE_USER'];
    
    const isAuthorized = userAuthorities.some(authority => authorities.includes(authority));
    
    return new Promise((resolve) => {
        resolve(isAuthorized);
    });
};

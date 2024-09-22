export const getUser = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const user = JSON.parse(atob(token.split(".")[1]));
    return user
};
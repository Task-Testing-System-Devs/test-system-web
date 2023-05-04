export default function checkToken(router) {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/");
    }
}
import axios from "axios";
// Next we make an 'instance' of it



export let host = window.location.origin;
export let wsHost = window.location.host;

if (window.location.port === "3000")
    if (true) {
        host = "http://192.168.37.254:8001"
        wsHost = "192.168.37.254:8001"
    } else {
        host = "http://192.168.60.32:8001"
        wsHost = "192.168.60.32:8001"
    }

const instance = axios.create({
    // add for build
    baseURL: host
});
export const token = sessionStorage.getItem('token');

instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
instance.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
instance.defaults.headers.common['Content-Type'] = "application/json"


export function getRefreshToken() {
    instance.get('/refresh')
        .then(response => response.data)
        .then(data => {
            sessionStorage.setItem('token', data.token)
        })
}
export function encrypt(data) {
    return instance.post('/enc', data)
}



export function getFolderList() {
    return instance.get('/folders')
}
export function getFolderContent(folderName) {
    return instance.get('/all/' + folderName)
}

export function getFiles(folder) {
    return instance.get('/allFiles/' + folder)
}

export function downloadFiles(files) {
    for (let i in files) {
        console.log("file", i, files[i])
        // window.open(host+"/download?uri="+files[i], "_blank")
        instance.get("/download?uri=" + files[i]).then((res) => {
            console.log("res", res)
        })
    }

}
export function login(password) {
    return instance.get("/login?pass=" + password)
}

export function uploadFiles(files) {
    const form = new FormData()
    files?.forEach(file => form.append('file', file))
    console.log("files", form)

    return instance.post("/upload", form)

}
export function deviceInfo() {

    return instance.get("/info")
}

export default host;
export const clone = (...args) => new Promise((res, rej) => {
    require("download-git-repo")(...args, err => {
        if (!err) res();
        else rej();
    })
});

export default clone;
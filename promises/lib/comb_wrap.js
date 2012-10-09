var comb = require("comb"),
    path = require("path"),
    resolve = path.resolve,
    fs = require("fs");

var fsFunctions = [
    "rename",
    "truncate",
    "chown",
    "fchown",
    "lchown",
    "chmod",
    "fchmod",
    "lchmod",
    "stat",
    "lstat",
    "fstat",
    "link",
    "symlink",
    "readlink",
    "realpath",
    "unlink",
    "rmdir",
    "mkdir",
    "readdir",
    "close",
    "open",
    "utimes",
    "futimes",
    "fsync",
    "write",
    "read",
    "readFile",
    "writeFile",
    "appendFile"
];

var fsp = {};
fsFunctions.forEach(function (method) {
    fsp[method] = comb.wrap(fs[method], fs);
});

comb.when(
    fsp.readFile(resolve(__dirname, "assets/myFile.txt"), "utf8"),
    fsp.readFile(resolve(__dirname, "assets/myFile2.txt"), "utf8"),
    fsp.readFile(resolve(__dirname, "assets/myFile3.txt"), "utf8")
).chain(function (contents) {
        return fsp.writeFile(resolve(__dirname, "./assets/myFile4.txt"), contents.join("\n"), "utf8");
    }).then(function () {
        console.log("Done");
    }, function (err) {
        console.log(err);
    })
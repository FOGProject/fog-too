module.exports.tasks = {
    stock: [
        {
            title: "Capture",
            description: "Capture an image from a host",
            runner: "fos",
            subRunner: "capture"
        },
        {
            title: "Deplopy",
            description: "Deploy an image to a host",
            runner: "fos",
            subRunner: "deploy"
        },
        {
            title: "Register",
            description: "Register a host with a FOG server",
            runner: "fos",
            subRunner: "register"
        },
    ]
};
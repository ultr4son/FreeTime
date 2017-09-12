module.exports = {
    entry: { 
        index: "./src/client/index.tsx",
        about: "./src/client/about.tsx"
    },
    output: {
		filename: "[name].bundle.js",
        path: __dirname + "/dist/client/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { test: /(\.html|\.css|\.svg|\.ico|\.ttf|\.woff|\.png)/, loader: "file-loader", options: {name: "[name].[ext]"} }


        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }


};

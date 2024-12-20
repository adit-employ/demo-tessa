const path = require('path')
module.exports = {
    transpileDependencies: [
        'vuetify',
        'axios',
    ],
    configureWebpack: {
        resolve: {
            alias: {
                // Main
                "@": path.resolve(__dirname, 'src'),

                // Consts
                //"constants": path.resolve(__dirname, 'src/constants'),

                // Public
                //"images": path.resolve(__dirname, 'assets/images'),

                // Components
                "components": path.resolve(__dirname, 'src/components'),
                "layouts": path.resolve(__dirname, 'src/components/layouts'),

                // Utilities
                //"directives": path.resolve(__dirname, 'src/directives'),
                "plugins": path.resolve(__dirname, 'src/plugins'),
               // "helpers": path.resolve(__dirname, 'src/helpers'),
                "routers": path.resolve(__dirname, 'src/routers'),
                "utils": path.resolve(__dirname, 'src/utils'),
                "stores": path.resolve(__dirname, 'src/stores'),
            }
        }
    },
}

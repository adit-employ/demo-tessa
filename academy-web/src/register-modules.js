import router from "./routers"
import store from "./stores"

const registerModule = (name, module) => {
    // console.log("proses register module : constanta", name, module)

    if (module.store) store.registerModule(name, module.store)
    if (module.router) module.router(router)
}

export const registerModules = modules => {
    // console.log("proses register module : export")
    Object.keys(modules).forEach(moduleKey => {
        const module = modules[moduleKey]
        registerModule(moduleKey, module)
    })
}

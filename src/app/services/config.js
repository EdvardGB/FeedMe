function ConfigManagerInstance() {

    if (typeof window.ConfigManagerInstance_ !== 'undefined')
        return Promise.resolve(window.ConfigManagerInstance_);

    window.ConfigManagerInstance_ = new ConfigManager();

    return Promise.resolve(window.ConfigManagerInstance_);
}

class ConfigManager {

    constructor() {
        this.config = Config;
    }

    set config(c) {
        this.config_ = c;
    }

    get config() {
        return this.config_;
    }

    getStore(storeName) {
        return this.config_.stores[storeName];
    }

}

const Config = {
    name: 'feedMe',
    version: 1,
    stores: {
        'OfflineStorage': {
            properties: {
                keyPath: 'id'
            },
            indexes: {
                todoItem: { unique : false }
            }
        }
    }
};

export default ConfigManagerInstance;
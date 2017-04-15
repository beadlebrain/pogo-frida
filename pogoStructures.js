let utils = require('./utils.js');
let log = utils.log;

let RequestType = {
    '0': 'METHOD_UNSET',                  
    '2': 'GET_PLAYER',                    
    '4': 'GET_INVENTORY',                 
    '5': 'DOWNLOAD_SETTINGS',             
    '6': 'DOWNLOAD_ITEM_TEMPLATES',       
    '7': 'DOWNLOAD_REMOTE_CONFIG_VERSION',
    '8': 'REGISTER_BACKGROUND_DEVICE',    
    '101': 'FORT_SEARCH',                 
    '102': 'ENCOUNTER',                   
    '103': 'CATCH_POKEMON',               
    '104': 'FORT_DETAILS',                
    '106': 'GET_MAP_OBJECTS',             
    '110': 'FORT_DEPLOY_POKEMON',         
    '111': 'FORT_RECALL_POKEMON',         
    '112': 'RELEASE_POKEMON',             
    '113': 'USE_ITEM_POTION',             
    '114': 'USE_ITEM_CAPTURE',            
    '115': 'USE_ITEM_FLEE',               
    '116': 'USE_ITEM_REVIVE',             
    '121': 'GET_PLAYER_PROFILE',          
    '125': 'EVOLVE_POKEMON',              
    '126': 'GET_HATCHED_EGGS',            
    '127': 'ENCOUNTER_TUTORIAL_COMPLETE', 
    '128': 'LEVEL_UP_REWARDS',            
    '129': 'CHECK_AWARDED_BADGES',        
    '133': 'USE_ITEM_GYM',                
    '134': 'GET_GYM_DETAILS',             
    '135': 'START_GYM_BATTLE',            
    '136': 'ATTACK_GYM',                  
    '137': 'RECYCLE_INVENTORY_ITEM',      
    '138': 'COLLECT_DAILY_BONUS',         
    '139': 'USE_ITEM_XP_BOOST',           
    '140': 'USE_ITEM_EGG_INCUBATOR',      
    '141': 'USE_INCENSE',                 
    '142': 'GET_INCENSE_POKEMON',         
    '143': 'INCENSE_ENCOUNTER',           
    '144': 'ADD_FORT_MODIFIER',           
    '145': 'DISK_ENCOUNTER',              
    '146': 'COLLECT_DAILY_DEFENDER_BONUS',
    '147': 'UPGRADE_POKEMON',             
    '148': 'SET_FAVORITE_POKEMON',        
    '149': 'NICKNAME_POKEMON',            
    '150': 'EQUIP_BADGE',                 
    '151': 'SET_CONTACT_SETTINGS',        
    '152': 'SET_BUDDY_POKEMON',           
    '153': 'GET_BUDDY_WALKED',         
    '154': 'USE_ITEM_ENCOUNTER',       
    '300': 'GET_ASSET_DIGEST',         
    '301': 'GET_DOWNLOAD_URLS',        
    '403': 'CLAIM_CODENAME',           
    '404': 'SET_AVATAR',               
    '405': 'SET_PLAYER_TEAM',          
    '406': 'MARK_TUTORIAL_COMPLETE',   
    '600': 'CHECK_CHALLENGE',          
    '601': 'VERIFY_CHALLENGE',         
    '666': 'ECHO',                     
    '800': 'SFIDA_REGISTRATION',       
    '801': 'SFIDA_ACTION_LOG',          
    '802': 'SFIDA_CERTIFICATION',   
    '803': 'SFIDA_UPDATE',       
    '804': 'SFIDA_ACTION',       
    '805': 'SFIDA_DOWSER',        
    '806': 'SFIDA_CAPTURE',             
    '807': 'LIST_AVATAR_CUSTOMIZATIONS',
    '808': 'SET_AVATAR_ITEM_AS_VIEWED',   
    '809': 'GET_INBOX',                   
    '810': 'UPDATE_NOTIFICATION_STATUS',  
};

let getRequestName = exports.getRequestName = function(type) {
    return RequestType[type];
};

let getString = exports.getString = function(pointer) {
    if (pointer.isNull()) return '';
    pointer = pointer.add(16); //il2cpp padding
    let len = Memory.readInt(pointer);
    return Memory.readUtf16String(pointer.add(4), len); 
};

let getProtoObject = function(name, pointer) {
    pointer = pointer.add(16); //il2cpp padding
    if (name === 'GET_PLAYER') {
        pointer = Memory.readPointer(pointer).add(16);
        let country = getString(Memory.readPointer(pointer));
        let language = getString(Memory.readPointer(pointer.add(8)));
        let timezone = getString(Memory.readPointer(pointer.add(8+8)));

        let nice = `getPlayer({'${country}', '${language}', '${timezone}'})`;

        return {
            object: {
                player_locale: {
                    country: country,
                    language: language,
                    timezone: timezone,
                },
            },
            nice: nice,
        };

    } else if (name === 'DOWNLOAD_REMOTE_CONFIG_VERSION') {
        let platform = Memory.readInt(pointer);
        let deviceManufacturer = getString(Memory.readPointer(pointer.add(8)));
	    let deviceModel = getString(Memory.readPointer(pointer.add(8 + 8)));
	    let locale = getString(Memory.readPointer(pointer.add(8 + 8 + 8)));
	    let appVersion = Memory.readUInt(pointer.add(8 + 8 + 8 + 8));

        let nice = `getDownloadRemoteConfigVersion(${platform}, '${deviceManufacturer}', '${deviceModel}', '${locale}', ${appVersion})`;

        return {
            object: {
                platform: platform,
                deviceManufacturer: deviceManufacturer,
                deviceModel, deviceModel,
                locale: locale,
                appVersion: appVersion,
            },
            nice: nice,
        };
        

    } else if (name === "GET_INVENTORY") {
        let ms = Memory.readLong(pointer);
        return {
            object: {
                last_timestamp_ms: ms,
            },
            nice: utils.camelize(name) + `(${ms})`,
        };

    } else if (name) {
        return {
            object: {},
            nice: utils.camelize(name) + '()',
        };

    } else {
        return {
            object: {},
            nice: 'unhandled?',
        };
        
    }
}

exports.readRequestFromMemory = function(pointer) {
    let method = Memory.readInt(pointer);
    let payload = Memory.readPointer(pointer.add(8));
    let future = Memory.readPointer(pointer.add(8 + 8));

    let methodName = getRequestName(method);
    let proto = getProtoObject(methodName, payload);

    return {
        method: method,
        methodName: methodName,
        payloadAddr: payload.toString(),
        payload: proto.object,
        nice: proto.nice,
        future: future.toString(),
        _next: pointer.add(8 + 8 + 8),
    };
};
//public static int Send(int method, int timeoutMs, int retryDelayMs, IMessage inProto, Action`1<IFuture`1<RpcData>> outCallback, CancellationToken cancelToken);

{
    let RequestType = {
        0: METHOD_UNSET,                    // No implementation required
        2: GET_PLAYER,                      // Implemented [R & M]
        4: 	GET_INVENTORY,                   // Implemented [R & M]
        5: 	DOWNLOAD_SETTINGS,               // Implemented [R & M]
        6: 	DOWNLOAD_ITEM_TEMPLATES,         // Implemented [R & M]
        7: 	DOWNLOAD_REMOTE_CONFIG_VERSION,  // Implemented [R & M]
        8: 	REGISTER_BACKGROUND_DEVICE,      // Implemented [R & M]
        101: 	FORT_SEARCH,                   // Implemented [R & M]
        102: 	ENCOUNTER,                     // Implemented [R & M]
        103: 	CATCH_POKEMON,                 // Implemented [R & M]
        104: 	FORT_DETAILS,                  // Implemented [R & M]
        106: 	GET_MAP_OBJECTS,               // Implemented [R & M]
        110: 	FORT_DEPLOY_POKEMON,           // Implemented [R & M]
        111: 	FORT_RECALL_POKEMON,           // Implemented [R & M]
        112: 	RELEASE_POKEMON,               // Implemented [R & M]
        113: 	USE_ITEM_POTION,               // Implemented [R & M]
        114: 	USE_ITEM_CAPTURE,              // Implemented [R & M]
        115: 	USE_ITEM_FLEE,                 // Can't find this one
        116: 	USE_ITEM_REVIVE,               // Implemented [R & M]
        121: 	GET_PLAYER_PROFILE,            // Implemented [R & M]
        125: 	EVOLVE_POKEMON,                // Implemented [R & M]
        126: 	GET_HATCHED_EGGS,              // Implemented [R & M]
        127: 	ENCOUNTER_TUTORIAL_COMPLETE,   // Implemented [R & M]
        128: 	LEVEL_UP_REWARDS,              // Implemented [R & M]
        129: 	CHECK_AWARDED_BADGES,          // Implemented [R & M]
        133: 	USE_ITEM_GYM,                  // Implemented [R & M]
        134: 	GET_GYM_DETAILS,               // Implemented [R & M]
        135: 	START_GYM_BATTLE,              // Implemented [R & M]
        136: 	ATTACK_GYM,                    // Implemented [R & M]
        137: 	RECYCLE_INVENTORY_ITEM,        // Implemented [R & M]
        138: 	COLLECT_DAILY_BONUS,           // Implemented [R & M]
        139: 	USE_ITEM_XP_BOOST,             // Implemented [R & M]
        140: 	USE_ITEM_EGG_INCUBATOR,        // Implemented [R & M]
        141: 	USE_INCENSE,                   // Implemented [R & M]
        142: 	GET_INCENSE_POKEMON,           // Implemented [R & M]
        143: 	INCENSE_ENCOUNTER,             // Implemented [R & M]
        144: 	ADD_FORT_MODIFIER,             // Implemented [R & M]
        145: 	DISK_ENCOUNTER,                // Implemented [R & M]
        146: 	COLLECT_DAILY_DEFENDER_BONUS,  // Implemented [R & M]
        147: 	UPGRADE_POKEMON,               // Implemented [R & M]
        148: 	SET_FAVORITE_POKEMON,          // Implemented [R & M]
        149: 	NICKNAME_POKEMON,              // Implemented [R & M]
        150: 	EQUIP_BADGE,                   // Implemented [R & M]
        151: 	SET_CONTACT_SETTINGS,          // Implemented [R & M]
        152: 	SET_BUDDY_POKEMON,             // Implemented [R & M]
        153: 	GET_BUDDY_WALKED,              // Implemented [R & M]
        154: 	USE_ITEM_ENCOUNTER,            // Implemented [R & M]
        300: 	GET_ASSET_DIGEST,              // Implemented [R & M]
        301: 	GET_DOWNLOAD_URLS,             // Implemented [R & M]
        403: 	CLAIM_CODENAME,                // Implemented [R & M]
        404: 	SET_AVATAR,                    // Implemented [R & M]
        405: 	SET_PLAYER_TEAM,               // Implemented [R & M]
        406: 	MARK_TUTORIAL_COMPLETE,        // Implemented [R & M]
        600: 	CHECK_CHALLENGE,               // Implemented [R & M]
        601: 	VERIFY_CHALLENGE,              // Implemented [R & M]
        666: 	ECHO,                          // Implemented [R & M]
        800: 	SFIDA_REGISTRATION,            // Not yet released.
        801: 	SFIDA_ACTION_LOG,              // Implemented [R & M]
        802: 	SFIDA_CERTIFICATION,           // Not yet released.
        803: 	SFIDA_UPDATE,                  // Not yet released.
        804: 	SFIDA_ACTION,                  // Not yet released.
        805: 	SFIDA_DOWSER,                  // Not yet released.
        806: 	SFIDA_CAPTURE,                 // Not yet released.
        807: 	LIST_AVATAR_CUSTOMIZATIONS,    // Implemented [R & M]
        808: 	SET_AVATAR_ITEM_AS_VIEWED,     // Implemented [R & M]
        809: 	GET_INBOX,                     // Implemented [R & M]
        810: 	UPDATE_NOTIFICATION_STATUS,    // Implemented [R & M]
    };


    /**
     * Called synchronously when about to call sub_7c8ae0.
     *
     * @this {object} - Object allowing you to store state for use in onLeave.
     * @param {function} log - Call this function with a string to be presented to the user.
     * @param {array} args - Function arguments represented as an array of NativePointer objects.
     * For example use Memory.readUtf8String(args[0]) if the first argument is a pointer to a C string encoded as UTF-8.
     * It is also possible to modify arguments by assigning a NativePointer object to an element of this array.
     * @param {object} state - Object allowing you to keep state across function calls.
     * Only one JavaScript function will execute at a time, so do not worry about race-conditions.
     * However, do not use this to store function arguments across onEnter/onLeave, but instead
     * use "this" which is an object for keeping state local to an invocation.
     */
    onEnter: function(log, args, state) {
        var niceargs = '';
        niceargs += 'method=' + RequestType[args[1].toInt32()] + ', ';
        niceargs += 'timeoutMs=' + args[2].toInt32() + ', ';
        niceargs += 'retryDelayMs=' + args[3].toInt32() + ', ';
        niceargs += 'inProto=' + args[4] + ', ';
        niceargs += 'outCallback=' + args[5] + ', ';
        niceargs += 'cancelToken=' + args[6];
        log('[0x7c8ae0] NianticLabs.Platform.Rpc.Send(' + niceargs + ')');

        log(hexdump(args[4], {
            offset: 0,
            length: 256,
            header: true,
            ansi: true
        }));
    },

    /**
     * Called synchronously when about to return from sub_7c8ae0.
     *
     * See onEnter for details.
     *
     * @this {object} - Object allowing you to access state stored in onEnter.
     * @param {function} log - Call this function with a string to be presented to the user.
     * @param {NativePointer} retval - Return value represented as a NativePointer object.
     * @param {object} state - Object allowing you to keep state across function calls.
     */
    onLeave: function (log, retval, state) {
    }
}

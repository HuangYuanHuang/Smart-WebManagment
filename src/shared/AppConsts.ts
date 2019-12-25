export class AppConsts {

    static remoteServiceBaseUrl: string;
    static appBaseUrl: string;
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static localeMappings: any = [];

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'SmartSystem'
    };

    static readonly authorization = {
        encryptedAuthTokenName: 'enc_auth_token'
    };
    static abpEvent = {
        RefreshUrlEvent: "RefreshUrlEvent",
        WebClientConnectedEvent: "WebClientConnectedEvent",
        HomePageOnLoadEvent: 'HomePageOnLoadEvent',
        HomePageOnLeaveEvent: 'HomePageOnLeaveEvent',
        GetCNCDataEvent: 'GetCNCDataEvent',
        LinkHomeEvent: 'NavHomeEvent',
        GetCncErrorEvent: 'GetCncErrorEvent',
        GetProgram: "GetProgram",
        GetReadWriter: "GetReadWriter"

    }
}

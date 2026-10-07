// Generated from contracts/openapi.json. Do not edit; run npm run contracts:sync.
export interface paths {
    "/admin-api/audit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Audit */
        get: operations["administrationAudit"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Sign In */
        post: operations["administrationLogin"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Logout */
        post: operations["administrationLogout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Me */
        get: operations["administrationAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/auth/password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Password */
        post: operations["administrationChangePassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/auth/revoke-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Revoke */
        post: operations["administrationRevokeAll"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/blocks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Blocks */
        get: operations["administrationBlocks"];
        put?: never;
        /** Block */
        post: operations["administrationSetBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/chats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chats */
        get: operations["administrationChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/media": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Media */
        get: operations["administrationMedia"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/media/{identifier}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Media Bytes */
        get: operations["administrationMediaBytes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/media/{identifier}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Media Url */
        get: operations["administrationMediaUrl"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Messages */
        get: operations["administrationMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/messages/{identifier}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Message */
        get: operations["administrationMessage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/operations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Operations */
        get: operations["administrationOperations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/operations/{identifier}/retry": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Retry */
        post: operations["administrationRetryPurge"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/owners": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Owners */
        get: operations["administrationOwners"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/owners/{owner_id}/connections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Owner Connections */
        get: operations["administrationOwnerConnections"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/participants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Participants */
        get: operations["administrationParticipants"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/purges": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Purge */
        post: operations["administrationCreatePurge"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/purges/preview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Purge Preview */
        post: operations["administrationPurgePreview"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin-api/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Stats */
        get: operations["administrationStats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chats */
        get: operations["adminChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/{chat_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chat */
        get: operations["adminChat"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/chats/{chat_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chat Messages */
        get: operations["adminChatMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/cron/media-cleanup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Cleanup */
        get: operations["mediaCleanup"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/cron/media-jobs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Recover Media Jobs */
        get: operations["mediaJobRecovery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/messages/{message_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Message */
        get: operations["adminMessage"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search */
        get: operations["adminSearch"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/stats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Stats */
        get: operations["adminStats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Health */
        get: operations["health"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/health/ready": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ready */
        get: operations["readiness"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mini-api/chats": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chats */
        get: operations["miniChats"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mini-api/chats/{chat_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Chat Messages */
        get: operations["miniChatMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mini-api/media/{attachment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Media */
        get: operations["miniMedia"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mini-api/media/{attachment_id}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Media Url */
        get: operations["miniMediaUrl"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/mini-api/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Search */
        get: operations["miniSearch"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/telegram/webhook": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Webhook */
        post: operations["telegramWebhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** AccountResponse */
        AccountResponse: {
            /** Username */
            username: string;
        };
        /** AdminAttachmentResponse */
        AdminAttachmentResponse: {
            /** Available */
            available: boolean;
            /** Expires At */
            expires_at?: string | null;
            /** File Name */
            file_name?: string | null;
            /** File Size */
            file_size?: number | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Local Path */
            local_path?: string | null;
            /** Mime Type */
            mime_type?: string | null;
            /** Saved By Reply */
            saved_by_reply: boolean;
            /** Stored Size Bytes */
            stored_size_bytes?: number | null;
            /** Type */
            type: string;
        };
        /** AdminChatPage */
        AdminChatPage: {
            /** Items */
            items: components["schemas"]["AdminChatResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** AdminChatResponse */
        AdminChatResponse: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Telegram Chat Id */
            telegram_chat_id: number;
            /** Title */
            title: string | null;
            /** Type */
            type: string;
            /** Username */
            username: string | null;
        };
        /** AdminMessageDetail */
        AdminMessageDetail: {
            /** Attachments */
            attachments: components["schemas"]["AdminAttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Deleted At */
            deleted_at?: string | null;
            /** Edited At */
            edited_at?: string | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Deleted */
            is_deleted: boolean;
            /** Message Type */
            message_type: string;
            /** Reply To Message Id */
            reply_to_message_id?: string | null;
            /** Reply To Telegram Message Id */
            reply_to_telegram_message_id?: number | null;
            /** Sender User Id */
            sender_user_id?: string | null;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Telegram Message Id */
            telegram_message_id: number;
            /** Text */
            text?: string | null;
            /** Unversioned Attachments */
            unversioned_attachments?: components["schemas"]["AttachmentResponse"][];
            /** Versions */
            versions?: components["schemas"]["MessageVersionResponse"][];
        };
        /** AdminMessagePage */
        AdminMessagePage: {
            /** Items */
            items: components["schemas"]["AdminMessageResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** AdminMessageResponse */
        AdminMessageResponse: {
            /** Attachments */
            attachments: components["schemas"]["AttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Deleted At */
            deleted_at?: string | null;
            /** Edited At */
            edited_at?: string | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Deleted */
            is_deleted: boolean;
            /** Message Type */
            message_type: string;
            /** Reply To Message Id */
            reply_to_message_id?: string | null;
            /** Reply To Telegram Message Id */
            reply_to_telegram_message_id?: number | null;
            /** Sender User Id */
            sender_user_id?: string | null;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Telegram Message Id */
            telegram_message_id: number;
            /** Text */
            text?: string | null;
            /** Unversioned Attachments */
            unversioned_attachments?: components["schemas"]["AttachmentResponse"][];
            /** Versions */
            versions?: components["schemas"]["MessageVersionResponse"][];
        };
        /** AdminSearchResponse */
        AdminSearchResponse: {
            /** Items */
            items: components["schemas"]["AdminMessageResponse"][];
        };
        /** AttachmentResponse */
        AttachmentResponse: {
            /** Available */
            available: boolean;
            /** Expires At */
            expires_at?: string | null;
            /** File Name */
            file_name?: string | null;
            /** File Size */
            file_size?: number | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Mime Type */
            mime_type?: string | null;
            /** Saved By Reply */
            saved_by_reply: boolean;
            /** Stored Size Bytes */
            stored_size_bytes?: number | null;
            /** Type */
            type: string;
        };
        /** AuditPage */
        AuditPage: {
            /** Items */
            items: components["schemas"]["AuditResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** AuditResponse */
        AuditResponse: {
            /** Action */
            action: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Target */
            target: string | null;
        };
        /** BlockInput */
        BlockInput: {
            /** Blocked */
            blocked: boolean;
            /**
             * Kind
             * @enum {string}
             */
            kind: "owner" | "participant";
            /** Owner Id */
            owner_id?: number | null;
            /** Telegram Id */
            telegram_id: number;
        };
        /** ChatPage */
        ChatPage: {
            /** Items */
            items: components["schemas"]["ChatResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** ChatResponse */
        ChatResponse: {
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Messages */
            messages: number;
            /** Owner Id */
            owner_id: number;
            /** Owner Name */
            owner_name: string;
            /** Telegram Chat Id */
            telegram_chat_id: number;
            /** Title */
            title: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /** CleanupResponse */
        CleanupResponse: {
            /** Deleted */
            deleted: number;
            /** Failed */
            failed: number;
        };
        /** ConnectionPage */
        ConnectionPage: {
            /** Items */
            items: components["schemas"]["ConnectionResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** ConnectionResponse */
        ConnectionResponse: {
            /** Connected At */
            connected_at: string | null;
            /** Disconnected At */
            disconnected_at: string | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Enabled */
            is_enabled: boolean;
            /** Telegram Business Connection Id */
            telegram_business_connection_id: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /** DashboardResponse */
        DashboardResponse: {
            /** Chats */
            chats: number;
            /** Failed Downloads */
            failed_downloads: number;
            /** Last 24H */
            last_24h: number;
            /** Last 7D */
            last_7d: number;
            /** Media */
            media: number;
            /** Messages */
            messages: number;
            /** Owners */
            owners: number;
            /** Participants */
            participants: number;
            /** Pending Operations */
            pending_operations: number;
            /** Stored Bytes */
            stored_bytes: number;
        };
        /** ErrorResponse */
        ErrorResponse: {
            /** Detail */
            detail: string;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HealthResponse */
        HealthResponse: {
            /**
             * Status
             * @constant
             */
            status: "ok";
        };
        /** LoginInput */
        LoginInput: {
            /** Password */
            password: string;
            /** Username */
            username: string;
        };
        /** LoginResponse */
        LoginResponse: {
            /**
             * Expires At
             * Format: date-time
             */
            expires_at: string;
            /** Token */
            token: string;
        };
        /** MediaLinkResponse */
        MediaLinkResponse: {
            /** Direct */
            direct: boolean;
            /** Url */
            url: string;
            /** Valid Until */
            valid_until: string | null;
        };
        /** MediaPage */
        MediaPage: {
            /** Items */
            items: components["schemas"]["MediaResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** MediaResponse */
        MediaResponse: {
            /** Available */
            available: boolean;
            /** Caption */
            caption: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Chat Title */
            chat_title: string;
            /** Download Status */
            download_status: string;
            /** Expires At */
            expires_at?: string | null;
            /** File Name */
            file_name?: string | null;
            /** File Size */
            file_size?: number | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * Message Id
             * Format: uuid
             */
            message_id: string;
            /** Mime Type */
            mime_type?: string | null;
            /** Owner Id */
            owner_id: number;
            /** Saved By Reply */
            saved_by_reply: boolean;
            /** Sender Name */
            sender_name: string;
            /** Sender Telegram Id */
            sender_telegram_id: number | null;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Status */
            status: string;
            /** Stored Size Bytes */
            stored_size_bytes?: number | null;
            /** Type */
            type: string;
        };
        /** MessagePage */
        MessagePage: {
            /** Items */
            items: components["schemas"]["MessageResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** MessageResponse */
        MessageResponse: {
            /** Attachments */
            attachments: components["schemas"]["AttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Chat Title */
            chat_title: string;
            /** Deleted At */
            deleted_at?: string | null;
            /** Details */
            details?: {
                [key: string]: unknown;
            };
            /** Edited At */
            edited_at?: string | null;
            /**
             * Has Reply
             * @default false
             */
            has_reply: boolean;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Deleted */
            is_deleted: boolean;
            /** Is Outgoing */
            is_outgoing: boolean;
            /** Message Type */
            message_type: string;
            /** Owner Id */
            owner_id: number;
            reply_to?: components["schemas"]["MiniReplyResponse"] | null;
            /** Reply To Message Id */
            reply_to_message_id: string | null;
            /** Reply To Telegram Message Id */
            reply_to_telegram_message_id?: number | null;
            /** Sender Name */
            sender_name: string;
            /** Sender Telegram Id */
            sender_telegram_id: number | null;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Telegram Message Id */
            telegram_message_id: number;
            /** Text */
            text?: string | null;
            /** Unversioned Attachments */
            unversioned_attachments?: components["schemas"]["AttachmentResponse"][];
            /** Versions */
            versions?: components["schemas"]["MessageVersionResponse"][];
        };
        /** MessageVersionResponse */
        MessageVersionResponse: {
            /** Attachments */
            attachments: components["schemas"]["AttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /** Edited At */
            edited_at?: string | null;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /**
             * Kind
             * @enum {string}
             */
            kind: "original" | "edit" | "legacy";
            /** Message Type */
            message_type?: string | null;
            /**
             * Observed At
             * Format: date-time
             */
            observed_at: string;
            /** Text */
            text?: string | null;
        };
        /** MiniChatPage */
        MiniChatPage: {
            /** Items */
            items: components["schemas"]["MiniChatResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** MiniChatResponse */
        MiniChatResponse: {
            /** Chat Type */
            chat_type: string;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Last Message At */
            last_message_at?: string | null;
            /** Title */
            title: string;
            /**
             * Updated At
             * Format: date-time
             */
            updated_at: string;
        };
        /** MiniMessagePage */
        MiniMessagePage: {
            /** Items */
            items: components["schemas"]["MiniMessageResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** MiniMessageResponse */
        MiniMessageResponse: {
            /** Attachments */
            attachments: components["schemas"]["AttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Deleted At */
            deleted_at?: string | null;
            /** Edited At */
            edited_at?: string | null;
            /**
             * Has Reply
             * @default false
             */
            has_reply: boolean;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Deleted */
            is_deleted: boolean;
            /** Is Outgoing */
            is_outgoing: boolean;
            /** Message Type */
            message_type: string;
            reply_to?: components["schemas"]["MiniReplyResponse"] | null;
            /** Reply To Telegram Message Id */
            reply_to_telegram_message_id?: number | null;
            /** Sender Name */
            sender_name: string;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Telegram Message Id */
            telegram_message_id: number;
            /** Text */
            text?: string | null;
            /** Unversioned Attachments */
            unversioned_attachments?: components["schemas"]["AttachmentResponse"][];
            /** Versions */
            versions?: components["schemas"]["MessageVersionResponse"][];
        };
        /** MiniReplyResponse */
        MiniReplyResponse: {
            /** Attachments */
            attachments: components["schemas"]["AttachmentResponse"][];
            /** Caption */
            caption?: string | null;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /** Deleted At */
            deleted_at?: string | null;
            /** Edited At */
            edited_at?: string | null;
            /**
             * Has Reply
             * @default false
             */
            has_reply: boolean;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Is Deleted */
            is_deleted: boolean;
            /** Is Outgoing */
            is_outgoing: boolean;
            /** Message Type */
            message_type: string;
            /** Reply To Telegram Message Id */
            reply_to_telegram_message_id?: number | null;
            /** Sender Name */
            sender_name: string;
            /**
             * Sent At
             * Format: date-time
             */
            sent_at: string;
            /** Telegram Message Id */
            telegram_message_id: number;
            /** Text */
            text?: string | null;
        };
        /** MiniSearchResponse */
        MiniSearchResponse: {
            /** Items */
            items: components["schemas"]["MiniMessageResponse"][];
        };
        /** OkResponse */
        OkResponse: {
            /**
             * Ok
             * @default true
             */
            ok: boolean;
        };
        /** OperationPage */
        OperationPage: {
            /** Items */
            items: components["schemas"]["OperationResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** OperationResponse */
        OperationResponse: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Id
             * Format: uuid
             */
            id: string;
            /** Last Error */
            last_error: string | null;
            /** Processed */
            processed: number;
            /** Selection */
            selection: {
                [key: string]: unknown;
            };
            /** Status */
            status: string;
            /** Total */
            total: number;
        };
        /** PasswordInput */
        PasswordInput: {
            /** Current Password */
            current_password: string;
            /** New Password */
            new_password: string;
        };
        /** PeoplePage */
        PeoplePage: {
            /** Items */
            items: components["schemas"]["PersonResponse"][];
            /** Next Cursor */
            next_cursor?: string | null;
        };
        /** PersonResponse */
        PersonResponse: {
            /** Blocked */
            blocked: boolean;
            /** Chats */
            chats: number;
            /**
             * Connections
             * @default 0
             */
            connections: number;
            /** Media */
            media: number;
            /** Messages */
            messages: number;
            /** Name */
            name: string;
            /** Telegram Id */
            telegram_id: number;
            /** Username */
            username: string | null;
        };
        /** PurgeConfirm */
        PurgeConfirm: {
            /**
             * Confirmation
             * @constant
             */
            confirmation: "СТЕРТИ";
            /** Ids */
            ids?: string[];
            /**
             * Kind
             * @enum {string}
             */
            kind: "owner" | "participant" | "chat" | "message" | "attachment";
            /** Owner Id */
            owner_id?: number | null;
            /** Telegram Id */
            telegram_id?: number | null;
        };
        /** PurgeInput */
        PurgeInput: {
            /** Ids */
            ids?: string[];
            /**
             * Kind
             * @enum {string}
             */
            kind: "owner" | "participant" | "chat" | "message" | "attachment";
            /** Owner Id */
            owner_id?: number | null;
            /** Telegram Id */
            telegram_id?: number | null;
        };
        /** PurgePreview */
        PurgePreview: {
            /** Attachments */
            attachments: number;
            /** Chats */
            chats: number;
            /** Messages */
            messages: number;
            /** Stored Bytes */
            stored_bytes: number;
        };
        /** RecoveryResponse */
        RecoveryResponse: {
            /** Scheduled */
            scheduled: number;
        };
        /** StatsResponse */
        StatsResponse: {
            /** Messages Last 24 Hours */
            messages_last_24_hours: number;
            /** Messages Last 7 Days */
            messages_last_7_days: number;
            /** Total Chats */
            total_chats: number;
            /** Total Deleted Messages */
            total_deleted_messages: number;
            /** Total Edited Messages */
            total_edited_messages: number;
            /** Total Media Attachments */
            total_media_attachments: number;
            /** Total Stored Messages */
            total_stored_messages: number;
        };
        /** ValidationError */
        ValidationError: {
            /** Context */
            ctx?: Record<string, never>;
            /** Input */
            input?: unknown;
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** WebhookResponse */
        WebhookResponse: {
            /** Ok */
            ok: boolean;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    administrationAudit: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuditPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationLogin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationLogout: {
        parameters: {
            query?: never;
            header: {
                authorization: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationAccount: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationChangePassword: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PasswordInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationRevokeAll: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationBlocks: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationSetBlock: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BlockInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationChats: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationMedia: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MediaPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationMediaBytes: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                identifier: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationMediaUrl: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                identifier: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MediaLinkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationMessages: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessagePage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationMessage: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                identifier: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MessageResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationOperations: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperationPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationRetryPurge: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                identifier: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationOwners: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PeoplePage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationOwnerConnections: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path: {
                owner_id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ConnectionPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationParticipants: {
        parameters: {
            query?: {
                q?: string;
                owner_id?: number | null;
                participant_id?: number | null;
                chat_id?: string | null;
                message_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                direction?: ("incoming" | "outgoing") | null;
                content_type?: string | null;
                edited?: boolean | null;
                deleted?: boolean | null;
                saved_by_reply?: boolean | null;
                filename?: string | null;
                mime?: string | null;
                min_size?: number | null;
                max_size?: number | null;
                availability?: ("stored" | "pending" | "failed" | "expired" | "deleted") | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PeoplePage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationCreatePurge: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PurgeConfirm"];
            };
        };
        responses: {
            /** @description Successful Response */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OperationResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationPurgePreview: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PurgeInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PurgePreview"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    administrationStats: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DashboardResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Invalid selection or filters */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    adminChats: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminChatPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    adminChat: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                chat_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminChatResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    adminChatMessages: {
        parameters: {
            query?: {
                limit?: number;
                before?: string | null;
                after?: string | null;
                sender_id?: string | null;
                include_deleted?: boolean;
                cursor?: string | null;
            };
            header?: {
                authorization?: string | null;
            };
            path: {
                chat_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminMessagePage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    mediaCleanup: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CleanupResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    mediaJobRecovery: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecoveryResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    adminMessage: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path: {
                message_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminMessageDetail"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    adminSearch: {
        parameters: {
            query: {
                q: string;
                chat_id?: string | null;
                sender_id?: string | null;
                date_from?: string | null;
                date_to?: string | null;
                include_deleted?: boolean;
                limit?: number;
            };
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminSearchResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    adminStats: {
        parameters: {
            query?: never;
            header?: {
                authorization?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StatsResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    health: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HealthResponse"];
                };
            };
        };
    };
    readiness: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HealthResponse"];
                };
            };
        };
    };
    miniChats: {
        parameters: {
            query?: {
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                "x-telegram-init-data"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MiniChatPage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    miniChatMessages: {
        parameters: {
            query?: {
                before?: string | null;
                limit?: number;
                cursor?: string | null;
            };
            header?: {
                "x-telegram-init-data"?: string | null;
            };
            path: {
                chat_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MiniMessagePage"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    miniMedia: {
        parameters: {
            query?: never;
            header?: {
                "x-telegram-init-data"?: string | null;
            };
            path: {
                attachment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/octet-stream": string;
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    miniMediaUrl: {
        parameters: {
            query?: never;
            header?: {
                "x-telegram-init-data"?: string | null;
            };
            path: {
                attachment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MediaLinkResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    miniSearch: {
        parameters: {
            query: {
                q: string;
                limit?: number;
            };
            header?: {
                "x-telegram-init-data"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MiniSearchResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Service Unavailable */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
        };
    };
    telegramWebhook: {
        parameters: {
            query?: never;
            header?: {
                "x-telegram-bot-api-secret-token"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebhookResponse"];
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}

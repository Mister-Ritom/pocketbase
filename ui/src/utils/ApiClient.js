import PocketBase, { LocalAuthStore, isTokenExpired } from "pocketbase";
// ---
import { protectedFilesCollectionsCache } from "@/stores/collections";
import { setErrors } from "@/stores/errors";
import { setSuperuser } from "@/stores/superuser";
import { addErrorToast } from "@/stores/toasts";
import CommonHelper from "@/utils/CommonHelper";
import { replace } from "svelte-spa-router";
import { get } from "svelte/store";

const superuserFileTokenKey = "pb_superuser_file_token";

/**
 * Clears the authorized state and redirects to the login page.
 *
 * @param {Boolean} [redirect] Whether to redirect to the login page.
 */
PocketBase.prototype.logout = function (redirect = true) {
    this.authStore.clear();

    if (redirect) {
        replace("/login");
    }
};

/**
 * Generic API error response handler.
 *
 * @param  {Error}   err        The API error itself.
 * @param  {Boolean} notify     Whether to add a toast notification.
 * @param  {String}  defaultMsg Default toast notification message if the error doesn't have one.
 */
PocketBase.prototype.error = function (err, notify = true, defaultMsg = "") {
    if (!err || !(err instanceof Error) || err.isAbort) {
        return;
    }

    const statusCode = err?.status << 0 || 400;
    const responseData = err?.data || {};
    const msg = responseData.message || err.message || defaultMsg;

    // add toast error notification
    if (notify && msg) {
        addErrorToast(msg);
    }

    // populate form field errors
    if (!CommonHelper.isEmpty(responseData.data)) {
        setErrors(responseData.data);
    }

    // unauthorized
    if (statusCode === 401) {
        this.cancelAllRequests();
        return this.logout();
    }

    // forbidden
    if (statusCode === 403) {
        this.cancelAllRequests();
        return replace("/");
    }
};

/**
 * @return {Promise<String>}
 */
PocketBase.prototype.getSuperuserFileToken = async function (collectionId = "") {
    let needToken = true;

    if (collectionId) {
        const protectedCollections = get(protectedFilesCollectionsCache);
        needToken =
            typeof protectedCollections[collectionId] !== "undefined"
                ? protectedCollections[collectionId]
                : true;
    }

    if (!needToken) {
        return "";
    }

    let token = localStorage.getItem(superuserFileTokenKey) || "";

    // request a new token only if the previous one is missing or will expire soon
    if (!token || isTokenExpired(token, 10)) {
        // remove previously stored token (if any)
        token && localStorage.removeItem(superuserFileTokenKey);

        if (!this._superuserFileTokenRequest) {
            this._superuserFileTokenRequest = this.files.getToken();
        }

        token = await this._superuserFileTokenRequest;
        localStorage.setItem(superuserFileTokenKey, token);
        this._superuserFileTokenRequest = null;
    }

    return token;
};

/**
 * Files API methods
 */
PocketBase.prototype.files = {
    /**
     * Upload standalone files
     * @param {FormData} formData
     * @returns {Promise<Object>}
     */
    upload: function (formData) {
        return this.send("/api/files/upload", {
            method: "POST",
            body: formData,
        });
    },

    /**
     * Get list of files
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    getList: function (options = {}) {
        const params = new URLSearchParams();

        if (options.page) params.set("page", options.page);
        if (options.perPage) params.set("perPage", options.perPage);
        if (options.filter) params.set("filter", options.filter);
        if (options.sort) params.set("sort", options.sort);

        const queryString = params.toString();
        const url = "/api/files" + (queryString ? "?" + queryString : "");

        return this.send(url, {
            method: "GET",
        });
    },

    /**
     * Get a specific file
     * @param {string} id
     * @returns {Promise<Object>}
     */
    getOne: function (id) {
        return this.send(`/api/files/${id}`, {
            method: "GET",
        });
    },

    /**
     * Delete a file
     * @param {string} id
     * @returns {Promise<Object>}
     */
    delete: function (id) {
        return this.send(`/api/files/${id}`, {
            method: "DELETE",
        });
    },

    /**
     * Get file download URL
     * @param {string} id
     * @param {string} filename
     * @returns {string}
     */
    getDownloadUrl: function (id, filename) {
        return this.buildUrl(`/api/files/${id}/${filename}`);
    },
};

// Custom auth store to sync the svelte superuser store state with the authorized superuser instance.
class AppAuthStore extends LocalAuthStore {
    /**
     * @inheritdoc
     */
    constructor(storageKey = "__pb_superuser_auth__") {
        super(storageKey);

        this.save(this.token, this.record);
    }

    /**
     * @inheritdoc
     */
    save(token, record) {
        super.save(token, record);

        if (record?.collectionName == "_superusers") {
            setSuperuser(record);
        }
    }

    /**
     * @inheritdoc
     */
    clear() {
        super.clear();

        setSuperuser(null);
    }
}

const pb = new PocketBase(import.meta.env.PB_BACKEND_URL, new AppAuthStore());

// Add files API methods
pb.files = {
    /**
     * Upload standalone files
     * @param {FormData} formData
     * @returns {Promise<Object>}
     */
    upload(formData) {
        return pb.send("/api/files/upload", {
            method: "POST",
            body: formData,
        });
    },

    /**
     * Get list of files
     * @param {Object} options
     * @returns {Promise<Object>}
     */
    getList(options = {}) {
        const params = new URLSearchParams();

        if (options.page) params.set("page", options.page);
        if (options.perPage) params.set("perPage", options.perPage);
        if (options.filter) params.set("filter", options.filter);
        if (options.sort) params.set("sort", options.sort);

        const queryString = params.toString();
        const url = "/api/files" + (queryString ? "?" + queryString : "");

        return pb.send(url, {
            method: "GET",
        });
    },

    /**
     * Get a specific file
     * @param {string} id
     * @returns {Promise<Object>}
     */
    getOne(id) {
        return pb.send(`/api/files/${id}`, {
            method: "GET",
        });
    },

    /**
     * Delete a file
     * @param {string} id
     * @returns {Promise<Object>}
     */
    delete(id) {
        return pb.send(`/api/files/${id}`, {
            method: "DELETE",
        });
    },

    /**
     * Get file download URL
     * @param {string} id
     * @param {string} filename
     * @returns {string}
     */
    getDownloadUrl(id, filename) {
        return pb.buildUrl(`/api/files/${id}/${filename}`);
    },
};

if (pb.authStore.isValid) {
    pb.collection(pb.authStore.record.collectionName || "_superusers")
        .authRefresh()
        .catch((err) => {
            console.warn("Failed to refresh the existing auth token:", err);

            // clear the store only on invalidated/expired token
            const status = err?.status << 0;
            if (status == 401 || status == 403) {
                pb.authStore.clear();
            }
        });
}

export default pb;

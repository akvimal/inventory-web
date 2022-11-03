import apconfig from "../../config/apconfig";

const getTokenFromStorage = () => localStorage.getItem("token");

const headers = {
    headers: {
        Accept: "application/json",
        "auth-token": getTokenFromStorage(),
    }
}

export const getProjects = async (condition) => {
    return await apconfig
        .post(`/master/project/projects`, condition, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const removeProject = async (id) => {
    return await apconfig
        .delete(`/master/project/projects/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const createProject = async (project) => {
    return await apconfig
        .post(`/master/project/add_projects/`, project, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const findFarmTypes = async () => {
    return await apconfig
        .get(`/settings/farm/types`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const editProject = async (project) => {
    return await apconfig
        .post(`/master/project/update_projects`, project, headers)
        .catch((response) => response)
        .catch((error) => error);
};

export const getFarms = async (id) => {
    return await apconfig
        .post(`/master/farms/farms`, id, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const deleteFarms = async (id) => {
    return await apconfig
        .delete(`/master/farms/farms/${id}`, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const addNewFarm = async (farm) => {
    return await apconfig
        .post(`/master/farms/add_farms`, farm, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const editFarm = async (farm) => {
    return await apconfig
        .post(`/master/farms/update_farms`, farm, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getBarns = async (id) => {
    return await apconfig
        .post(`/master/barns/barns`, id, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const deleteBarn = async (id) => {
    return await apconfig
        .delete(`/master/barns/barns/${id}`, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const addNewBarn = async (barn) => {
    return await apconfig
        .post(`/master/barns/add_barns`, barn, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const editBarn = async (barn) => {
    return await apconfig
        .post(`/master/barns/update_barns`, barn, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getPens = async () => {
    return await apconfig
        .post(`/master/pens/pens`, {}, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const deletePen = async (id) => {
    return await apconfig
        .delete(`/master/pens/pens/${id}`, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const addNewPen = async (pen) => {
    return await apconfig
        .post(`/master/pens/add_pens`, pen, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const editPens = async (pen) => {
    return await apconfig
        .post(`/master/pens/update_pens`, pen.headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getUser = async (id) => {
    return await apconfig
        .post(`/master/users/users/`, id, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getUserRoles = async () => {
    return await apconfig
        .post(`/master/users/roles`, {}, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const editUser = async (user) => {
    return await apconfig
        .post(`/master/users/update_users`, user, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const addNewUser = async (user) => {
    return await apconfig
        .post(`/master/users/add_users`, user, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const deleteUser = async (id) => {
    return await apconfig
        .delete(`/master/users/users/${id}`, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getAlertUser = async () => {
    return await apconfig
        .post(`/master/alert_email/alert_email`, {}, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const addNewAlertMail = async (alert) => {
    return await apconfig
        .post(`/master/alert_email/add_alert_email`, alert, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const updateAlertMail = async (alert) => {
    return await apconfig
        .post(`/master/alert_email/update_alert_email`, alert, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const removeAlertMail = async (id) => {
    return await apconfig
        .post(`/master/alert_email/remove/alert_email`, id, headers)
        .then((response) => response)
        .catch((error) => error);
};

export const getOrganization = async () => {
    return await apconfig
        .get(`/organizations/locations`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const addLocation = async (id, country, state, city) => {
    return await apconfig
        .post(`/settings/locations`, {
            id: id,
            country: country,
            state: state,
            city: city,
        },
            headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const deleteLocation = async (id) => {
    return await apconfig
        .delete(`/settings/locations/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const getLocation = async () => {
    return await apconfig
        .get(`/settings/locations`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const addOrganization = async (org) => {
    return await apconfig
        .post(`/organizations`, org, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const deleteOrganization = async (id) => {
    return await apconfig
        .delete(`/organizations/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const linkOutLocation = async (id) => {
    return await apconfig
        .delete(`/organizations/locations/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const getDeviceTypes = async () => {
    return await apconfig
        .get(`/settings/device/types`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const addDeviceTypes = async (id, name) => {
    return await apconfig
        .post(`/settings/device/types`, { id: id, name: name }, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const deleteDeviceTypes = async (id) => {
    return await apconfig
        .delete(`/settings/device/types/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const getDeviceVersion = async () => {
    return await apconfig
        .get(`/settings/device/versions`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const addDeviceVersion = async (id, name, launch, type_id) => {
    return await apconfig
        .post(`/settings/device/versions`, {
            id: id,
            name: name,
            launch: launch,
            type_id: type_id,
        },
            headers)
        .then((response) => response)
        .catch((error) => alert(error));
};

export const deleteDeviceVersion = async (id) => {
    return await apconfig
        .delete(`settings/device/versions/${id}`, headers)
        .then((response) => response)
        .catch((error) => alert(error));
};


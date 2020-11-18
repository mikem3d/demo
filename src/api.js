const Api = {
  apiUrl: 'https://api.spacexdata.com/v3/',
  headerConfig: {},

  apiCall(url, method = 'GET', data) {
    let payload = {};

    this.headerConfig.Accept = 'application/json';

    if (
      method === 'POST' ||
      method === 'PUT' ||
      method === 'PATCH' ||
      method === 'DELETE'
    ) {
      this.headerConfig['Content-Type'] = 'application/json';

      payload = {
        method,
        headers: this.headerConfig,
        body: data ? JSON.stringify(data) : null,
        credentials: 'omit',
      };
    } else if (method === 'GET') {
      payload = {
        method,
        headers: this.headerConfig,
      };
    }

    const endpoint = `${this.apiUrl}${url}`;

    console.log('apicall', endpoint);
    // console.log('payload', payload);

    return fetch(endpoint, {...payload})
      .then((response) => {
        // lets catch any json parsing errors
        try {
          const json = response.json();
          return json;
        } catch (e) {
          return response;
        }
      })
      .catch((e) => {
        console.log('Error', e);
      });
  },

  getLaunches() {
    return this.apiCall('launches');
  },

  getLaunch(launchNumber) {
    return this.apiCall(`launches/${launchNumber}`);
  },

  createLaunch(payload) {
    // return this.apiCall('launches', 'POST', payload);
  },
};

export default Api;

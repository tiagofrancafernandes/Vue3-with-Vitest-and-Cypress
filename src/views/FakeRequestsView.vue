<template>
    <div>
        <h1>API Request Tool</h1>

        <div>
            <label for="environment">Select Environment:</label>
            <select
                v-on:change="environmentChanged"
                id="environment"
            >
                <option
                    v-for="(url, env) in environments"
                    :key="env"
                    :value="url"
                >
                    {{ env }} | {{ url }}
                </option>
            </select>
        </div>

        <div>
            <label for="token">Token:</label>
            <input
                type="text"
                v-bind:value="token"
                v-on:keyup="tokenChanged"
                id="token"
                placeholder="Enter your token"
            />
        </div>

        <div
            v-for="(request, index) in requests"
            :key="index"
            class="request-block"
        >
            <div class="request-item">
                <h3>{{ request.method }} {{ request.endpoint }}</h3>
                <div class="note" v-html="request?.note"></div>
                <div v-if="request.body">
                    <h4>Request Body</h4>
                    <div
                        v-for="(value, key) in request.body"
                        :key="key"
                    >
                        <input
                            type="text"
                            v-model="request.body[key]"
                            :placeholder="key"
                        />
                    </div>
                    <button @click="addBodyField(index)">Add Field</button>
                </div>
                <button @click="makeRequest(request)">Send Request</button>
                <hr>
                <div v-if="request?.response">
                    <h2>Response</h2>
                    <div>
                        <strong>Status Code:</strong> {{ request?.response?.status }}
                    </div>
                    <div>
                        <strong>Headers:</strong>
                        <textarea rows="5" cols="50" readonly>{{ request?.response?.headers }}</textarea>
                    </div>
                    <div>
                        <strong>Body:</strong>
                        <textarea rows="10" cols="50" readonly>{{ request?.response?.body }}</textarea>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <div v-if="request">
            <h2>Response</h2>
            <pre>{{ request }}</pre>
        </div>

        <div v-if="response">
            <h2>Response</h2>
            <div>
                <strong>Status Code:</strong> {{ response.status }}
            </div>
            <div>
                <strong>Headers:</strong>
                <textarea rows="5" cols="50" readonly>{{ response.headers }}</textarea>
            </div>
            <div>
                <strong>Body:</strong>
                <textarea rows="10" cols="50" readonly>{{ response.body }}</textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
let lsToken = ref(localStorage.getItem('api_dev_token'));
let selectedEnvironment = ref(localStorage.getItem('api_dev_environment') || 'http://127.0.0.1:8001');

const getToken = () => {
    return localStorage.getItem('api_dev_token') || null;
}

const setToken = (value) => {
    lsToken.value = value;
    localStorage.setItem('api_dev_token', lsToken.value);
}

const getSelectedEnvironment = () => {
    return localStorage.getItem('api_dev_environment') || 'http://127.0.0.1:8001';
}

const setSelectedEnvironment = (value) => {
    selectedEnvironment.value = value;
    localStorage.setItem('api_dev_environment', selectedEnvironment.value);
}

const environmentChanged = (event) => {
    console.log('environmentChanged');
    setSelectedEnvironment(event.target.value);
}

let packages = [
    `{
        name: "Pacote 100 I",
        code: "pacote-100-i-2m-brl",
        credits: 100,
        expiration_in_days: 60,
        currency: "BRL",
        price: 400.0
      }`,
      `{
        name: "Pacote 100 II",
        code: "pacote-100-ii-6m-brl",
        credits: 100,
        expiration_in_days: 180,
        price: 500.0
    }`,
].join(`\n`)

export default {
    data() {
        return {
            environments: {
                local: 'http://127.0.0.1:8001',
                local2: 'http://127.0.0.1:8000',
                local3: 'http://mudeclick.localhost',
                homologacao: 'https://api-hml.mudeclick.com.br',
                producao: 'https://api.mudeclick.com.br',
            },
            selectedEnvironment,
            token: lsToken,
            getToken,
            setToken,
            requests: [
                { method: 'GET', endpoint: '/api/auth/me', body: null, note: '' },
                { method: 'POST', endpoint: '/api/auth/logout', body: null, note: '' },
                { method: 'POST', endpoint: '/api/auth/login', body: { email: 'admin@mail.com', password: 'power@123' }, note: '' },
                { method: 'POST', endpoint: '/api/wallet/balance', body: null, note: '' },
                { method: 'POST', endpoint: '/api/wallet/credit/add', body: { package: 'pacote-100-ii-6m-brl' }, note: packages },
                { method: 'POST', endpoint: '/api/wallet/credit/add', body: { package: 'pacote-100-ii-6m-brl', expires_in_days: 10, credits: 25 }, note: packages },
                { method: 'POST', endpoint: '/api/wallet/credit/subtract', body: { value: '' }, note: '' },
            ],
            response: null,
        };
    },
    methods: {
        environmentChanged,
        async tokenChanged(event) {
            // getToken
            console.log('tokenChanged', event.target.value);
            setToken(event.target.value);
        },
        async makeRequest(request) {
            request = request || {};
            const url = `${this.selectedEnvironment}${request.endpoint}`;
            const options = {
                method: request.method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`,
                },
                body: request.body ? JSON.stringify(request.body) : null,
            };

            // try {
            //     const res = await fetch(url, options);
            //     const data = await res.json();
            //     this.response = JSON.stringify(data, null, 2);
            // } catch (error) {
            //     this.response = `Error: ${error.message}`;
            // }

              try {
                const res = await fetch(url, options);
                const data = await res.json();
                const headers = Array.from(res.headers.entries()).map(([key, value]) => `${key}: ${value}`).join('\n');
                this.response = {
                    status: res.status,
                    headers: headers,
                    body: JSON.stringify(data, null, 2)
                };
                request.response = this.response;
            } catch (error) {
                this.response = {
                    status: 'Error',
                    headers: '',
                    body: `Error: ${error.message}`
                };

                request.response = this.response;
            };
        },
        addBodyField(index) {
            this.$set(this.requests[index].body, '', '');
        },
    },
};
</script>

<style>
.request-item, .request-block {
    margin-top: 3rem;
    margin-bottom: 3rem;
}
.note {
  display: block;
  font-family: monospace, -moz-fixed;
  white-space: pre;
  margin-block: 1em;
}
</style>

import { get } from 'radash';

const hasExpandedVar = (value) => {
    if (!value || typeof value !== 'string') {
        return false;
    }

    // return /^(\$\{)([a-zA-Z_]){1,}([a-zA-Z_0-9]){1,}(\})$/.test(value);
    return /^\$\{(.*)\}(.*)/g.test(value);
}

const expandedVarName = (value) => {
    if (!value || typeof value !== 'string') {
        return null;
    }

    // return /^(\$\{)([a-zA-Z_]){1,}([a-zA-Z_0-9]){1,}(\})$/.test("${API_BASE_URI}")
    // return hasExpandedVar(value) ? value.slice(2).slice(0, -1) : null;

    // let matches = [...("${API_BASE_URI}").matchAll(/^\$\{(.*)\}$/g)]
    let matches = [...((value)?.matchAll(/^\$\{(.*)\}(.*)/g)) || []];
    matches = matches[0] ?? [];

    return matches && matches?.length > 1 ? matches ?? null : null;
}

export const env = (key = null, defaultValue = null) => {
    let __envs = globalThis?._env || {};
    __envs = __envs && typeof __envs === 'object' ? __envs : {};

    __envs = Object.fromEntries(
        Object.entries(__envs).map(i => {
            let [key, value] = i;

            if (hasExpandedVar(value)) {
                let varReplaceInfo = expandedVarName(value);
                let varReplaceStr = varReplaceInfo ? varReplaceInfo[0] : null;
                let varName = varReplaceInfo ? varReplaceInfo[1] : null;
                let varValue = varName === key ? null : get(__envs, varName ?? 'varName', value);
                value = varReplaceInfo ? varReplaceInfo.slice(1).map(i => i === varName ? varValue : i).join('') : value;
            }

            return [key, value]
        })
    )

    if (key === null) {
        return __envs;
    }

    key = typeof key === 'string' ? key : null;

    if (key === null) {
        return defaultValue;
    }

    return key in __envs ? __envs[key] : defaultValue;
}

export default env

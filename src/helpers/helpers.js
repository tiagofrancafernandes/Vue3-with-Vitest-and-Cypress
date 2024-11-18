export const ifObjectOr = (data, defaultValue = null) => {
    return data && typeof data === 'object' && !Array.isArray(data) ? data : defaultValue;
}

export const isObject = (data) => {
    return Boolean(data && typeof data === 'object' && !Array.isArray(data));
}

export const isArray = (data) => {
    return Boolean(data && Array.isArray(data));
}

export const ifArrayOr = (data, defaultValue = null) => {
    return data && Array.isArray(data) ? data : defaultValue;
}

export const ifObjectOrArrayOr = (data, defaultValue = null) => {
    return (ifObjectOr(data, false) || ifArrayOr(data, false)) ? data : defaultValue;
}

export const ifArrayOrObjectOr = (data, defaultValue = null) => {
    return (ifArrayOr(data, false) || ifObjectOr(data, false)) ? data : defaultValue;
}

export const isString = (data) => {
    return typeof data === 'string';
}

export const ifStringOr = (data, defaultValue = null) => {
    return typeof data === 'string' ? data : defaultValue;
}

export const ifTypeInOr = (data, types = [], defaultValue = null) => {
    types = ifArrayOr(types, []).filter(i => ifStringOr(i, null));
    return types.includes(typeof data) ? data : defaultValue;
}

export const isNumeric = (data) => {
    return Boolean(data !== null && !isNaN(Number(data)));
}

export const isNull = (data) => {
    return Boolean(data === null);
}

export const isUndefined = (data) => {
    return Boolean(data === undefined);
}

export const isFilled = (data) => {
    if (isNull(data) || isUndefined(data)) {
        return false;
    }

    if (isString(data)) {
        return Boolean(data.trim().length > 0);
    }

    if (isNumeric(data)) {
        return true;
    }

    if (ifArrayOrObjectOr(data, false)) {
        return Boolean(Object.keys(data).length > 0);
    }

    return Boolean(data);
}

export const ifNumericOr = (data, defaultValue = null) => {
    return isNumeric(data) ? data : defaultValue;
}

export const toNumberOr = (data, defaultValue = null) => {
    return isNumeric(data) ? Number(data) : defaultValue;
}

export const positiveNumberOr = (data, acceptZero = true, defaultValue = null) => {
    if (isNumeric(acceptZero)) {
        defaultValue = defaultValue ?? acceptZero;
        acceptZero = true;
    }

    if (!isNumeric(data)) {
        return defaultValue;
    }

    data = toNumberOr(data);

    if (acceptZero) {
        return data >= 0 ? data : defaultValue;
    }

    return data > 0 ? data : defaultValue;
}

export const toNumeric = (data, defaultValue = null) => {
    return toNumberOr(data, defaultValue);
}

export const toIntOr = (data, defaultValue = null) => {
    return (data !== null && !isNaN(parseInt(data))) ? parseInt(data) : defaultValue;
}

export const toFloatOr = (data, defaultValue = null) => {
    return (data !== null && !isNaN(parseFloat(data))) ? parseFloat(data) : defaultValue;
}

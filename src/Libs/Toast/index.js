import Toastify from 'toastify-js';

import { ifObjectOr, isString, isNumeric, toNumberOr, positiveNumberOr, isObject } from '@/helpers/helpers';

const getOptions = (options = {}, ...args) => {
    if (isString(options)) {
        options = {
            text: options,
        };
    }

    options = ifObjectOr(options, {});

    if (isNumeric(args[0])) {
        options['duration'] = positiveNumberOr(options['duration'], args[0] ?? null);
    }

    if (isNumeric(args[1])) {
        options['duration'] = positiveNumberOr(options['duration'], args[1] ?? null);
    }

    if (isObject(args[0])) {
        options['style'] = ifObjectOr(options['style'], args[0] ?? null);
    }

    if (isObject(args[1])) {
        options['style'] = ifObjectOr(options['style'], args[1] ?? null);
    }

    let {text, duration} = options;

    options['duration'] = positiveNumberOr(duration, 3000);
    options['style'] = ifObjectOr(options['style'], {
        background: "linear-gradient(to right, #00b09b, #00b09b)",
    });

    text = isString(text) ? text.trim() : null;

    return {
        text,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function() {}, // Callback after click
        ...options,
    };
}

export const toastIt = (options = {}, ...args) => {
    options = getOptions(options, ...args);

    let {text, duration} = options;

    if (!text) {
        return null;
    }

    return Toastify(getOptions(options)).showToast();
}

export const toast = {
    toastIt,
    get toast() {
        return toastIt
    },
    success(options, ...args) {
        options = getOptions(options, ...args);

        return toastIt({
            ...options,
            style: {
                background: "#96c93d",
            },
        });
    },
    info(options, ...args) {
        options = getOptions(options, ...args);

        return toastIt({
            ...options,
            style: {
                background: "#3a96dd",
            },
        });
    },
    error(options, ...args) {
        options = getOptions(options, ...args);

        return toastIt({
            ...options,
            style: {
                background: "#c50f1f",
            },
        });
    },
    danger(options, ...args) {
        options = getOptions(options, ...args);

        return toastIt({
            ...options,
            style: {
                background: "#FAC03B",
            },
        });
    },
}

export default toast;

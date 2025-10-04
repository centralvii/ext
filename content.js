const DARK_READER_STYLE_ID = 'dark-mode-style-sheet';

function isColor(v) {
    return v.startsWith('#') || v.startsWith('rgb') || v.startsWith('hsl');
}

function invertColor(color) {
    if (color.startsWith('#')) {
        let hex = color.substring(1);
        if (hex.length === 3) {
            hex = hex
                .split('')
                .map((c) => c + c)
                .join('');
        }
        const r = 255 - parseInt(hex.substring(0, 2), 16);
        const g = 255 - parseInt(hex.substring(2, 4), 16);
        const b = 255 - parseInt(hex.substring(4, 6), 16);
        return `#${r.toString(16).padStart(2, '0')}${g
            .toString(16)
            .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    if (color.startsWith('rgb')) {
        const [r, g, b] = color.match(/\d+/g).map(Number);
        return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    }
    // Basic HSL inversion - may need more complex logic
    if (color.startsWith('hsl')) {
        const [h, s, l] = color.match(/[\d.]+/g).map(Number);
        const newL = 100 - l;
        return `hsl(${h}, ${s}%, ${newL}%)`;
    }
    return color; // Return unchanged if not a recognized format
}

function generateDarkModeStyles() {
    let css = '';
    const styleSheets = Array.from(document.styleSheets);

    // Basic inversion for body
    css +=
        'body, html { background-color: #1a1a1a !important; color: #e0e0e0 !important; }';
    css += 'a { color: #87ceeb !important; }'; // Make links readable

    for (const sheet of styleSheets) {
        try {
            if (!sheet.cssRules) continue;
            for (const rule of sheet.cssRules) {
                if (rule.style) {
                    let newStyle = '';
                    for (const prop of [
                        'color',
                        'background-color',
                        'border-color',
                    ]) {
                        const value = rule.style[prop];
                        if (value && isColor(value)) {
                            newStyle += `${prop}: ${invertColor(
                                value
                            )} !important; `;
                        }
                    }
                    if (newStyle) {
                        css += `${rule.selectorText} { ${newStyle} } `;
                    }
                }
            }
        } catch (e) {
            // Ignore CORS errors on external stylesheets
        }
    }
    return css;
}

function applyDarkMode() {
    if (document.getElementById(DARK_READER_STYLE_ID)) {
        return; // Already applied
    }
    const darkStyles = generateDarkModeStyles();
    const styleElement = document.createElement('style');
    styleElement.id = DARK_READER_STYLE_ID;
    styleElement.textContent = darkStyles;
    document.head.appendChild(styleElement);
}

function removeDarkMode() {
    const styleElement = document.getElementById(DARK_READER_STYLE_ID);
    if (styleElement) {
        styleElement.remove();
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.darkMode) {
        applyDarkMode();
    } else {
        removeDarkMode();
    }
});

// Apply on initial load
chrome.storage.sync.get('darkMode', (data) => {
    if (data.darkMode) {
        applyDarkMode();
    }
});

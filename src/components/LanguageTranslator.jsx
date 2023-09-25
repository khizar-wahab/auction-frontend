import React, { useEffect } from 'react'
import './LanguageTranslator.css'

const LanguageTranslator = () => {

    useEffect(() => {
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,de,fr,bn", // Add or adjust languages as needed
                    autoDisplay: false,
                    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
                },
                "google_translate_element"
            );
        };

        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <>
            <div id="google_translate_element"></div>
        </>
    )
}

export default LanguageTranslator

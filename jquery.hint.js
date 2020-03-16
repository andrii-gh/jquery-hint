(function ($) {

    $.fn.ybkHint = function (action, options) {
        switch (action) {
            case 'show': {
                options = $.extend({
                    hideTimeout: 2000,
                    noHide: false,
                }, options);

                show(options);

                break;
            }

            case 'hide': {
                hide(options);

                break;
            }
        }
    };

    function show(options) {
        const name = options.name;

        const template = `
            <div
                data-ybk-hint="${name}"
                data-ybk-hint-state="expanded"
                class="ybk-popup-hint-element-loading ybk-popup-hint-element-loading_theme-default">
                    <div class="ybk-popup-hint-element-loading__content ybk-popup-hint-element-loading__content_theme-default">
                       
                       ${options.addPreloader
                            ? `<div class="ybk-popup-hint-element-loading-content__preloader ybk-popup-hint-element-loading-content__preloader_theme-default"></div>`
                            : '' }
                       
                        <div class="ybk-popup-hint-element-loading-content__text ybk-popup-hint-element-loading-content__text_theme-default">
                            ${options.content}
                        </div>
                    </div>
            </div>
        `;

        $('body').append(template);

        if (options.noHide) {
            return;
        }

        setTimeout(() => {
            hide(options);
        }, options.hideTimeout)
    }

    function hide(options) {
        $(`[data-ybk-hint="${options.name}"]`)
            .attr('data-ybk-hint-state', 'collapsed')
            .on('animationend', function() {
                $(this).remove();
            });
    }

}(jQuery));
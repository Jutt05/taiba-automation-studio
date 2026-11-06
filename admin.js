(function ($) {
  $(function () {
    $('.taiba-image').each(function () {
      var box = $(this);
      var input = box.find('input[type=hidden]');
      var img = box.find('img');
      var frame;

      box.find('.taiba-pick').on('click', function (e) {
        e.preventDefault();
        if (!frame) {
          frame = wp.media({ title: 'Choose image', multiple: false, library: { type: 'image' } });
          frame.on('select', function () {
            var a = frame.state().get('selection').first().toJSON();
            input.val(a.url);
            img.attr('src', a.url);
          });
        }
        frame.open();
      });

      box.find('.taiba-clear').on('click', function (e) {
        e.preventDefault();
        input.val('');
        img.attr('src', box.data('default') || '');
      });
    });
  });
})(jQuery);

(function () {
  var mainCanvas = document.createElement('canvas')
  mainCanvas.id = 'NOTED_CANVAS_____'

  // Set display to none so that if the page fails to load properly the canvas won't be displayed.
  mainCanvas.style.display = 'none'
  document.body.appendChild(mainCanvas)

  // Create image exporting Canvas
  var tempCanvas = document.createElement('canvas')
  tempCanvas.id = 'NOTED_TEMP_CANVAS_____'
  tempCanvas.style.display = 'none'
  tempCanvas.width = window.innerWidth
  tempCanvas.height = window.innerHeight
  document.body.appendChild(tempCanvas)

  var createPanel = function () {
    document.body.innerHTML += '<div id="NOTED_PANEL_____" class="NOTED_DEACTIVATED">\
    <img src="data:image/png;base64,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" id="NOTED_ICON_____" title="Toggle Noted"/>\
    <div class="NOTED_CONTROL" title="Select" id="NOTED_TOOL_SELECT_____">&#x2B1A;</div>\
    <div class="NOTED_CONTROL" title="Color Picker Tool" id="NOTED_TOOL_EYEDROPPER_____">&#x1F3A8;</div>\
    <div class="NOTED_CONTROL" title="Free Draw" id="NOTED_TOOL_FREE_____">&#x1F58D;</div>\
    <div class="NOTED_CONTROL" title="Circle Tool"id="NOTED_TOOL_CIRCLE_____">&#x25CB;</div>\
    <div class="NOTED_CONTROL" title="Rectangle Tool" id="NOTED_TOOL_RECT_____">&#x25A1;</div>\
    <div class="NOTED_CONTROL" title="Text Tool" id="NOTED_TOOL_TEXT_____">T</div>\
    <div class="NOTED_CONTROL" title="Eraser Tool" id="NOTED_TOOL_ERASE_____">&#x25E7;</div>\
    <div class="NOTED_CONTROL" title="Clear Canvas" id="NOTED_TOOL_CLEAR_____" style="background-color: rgba(255,0,0,0.2);">&#x1F5D9;</div>\
    <input class="NOTED_CONTROL" title="Stroke Color" type="color" value="#FF0000" id="NOTED_STROKE_COLOR_____"/>\
    <input class="NOTED_CONTROL" title="Fill Color" type="color" value="#FFFFFF" id="NOTED_FILL_COLOR_____"/>\
    <input class="NOTED_CONTROL" title="Stroke Width" type="number" value="10" min="0" max="500" id="NOTED_STROKE_WIDTH_____"/>\
    <input class="NOTED_CONTROL" title="Fill Opacity" type="number" value="0" min="0" max="255" id="NOTED_FILL_OPACITY_____"/>\
    <a class="NOTED_CONTROL" id="NOTED_PREVIEW_____" title="Preview Field" target="_blank" download="Noted Screen Capture"><img/></a>\
    <div class="NOTED_CONTROL" title="Capture page" id="NOTED_TOOL_SCREENSHOT_____" style="position: absolute; bottom: 0px;">&#x1F4F7;</div>\
    </div>'

    document.getElementById('NOTED_PANEL_____').style.display = 'none'
  }
  createPanel()
})()

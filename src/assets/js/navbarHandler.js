const $ = require('jquery');
const { ipcMain, ipcRenderer, shell, dialog } = require('electron');
const fs = require('fs');
const fse = require('fs-extra');

$(window).on('load', function () {
    $('#close-app-icon').on('click', async function() {
        if (typeof saveBeforeClose == 'function') {
            await saveBeforeClose();
        }
        ipcRenderer.send('closeApp');
    })
    $('#minimize-app-icon').on('click', function () {
        ipcRenderer.send('minimizeApp');
    })
    $('#resize-maximize-app-icon, #resize-minimize-app-icon').on('click', function(){
        $('#resize-maximize-app-icon').toggle();
        $('#resize-minimize-app-icon').toggle();
        ipcRenderer.send('resizeApp'); 
    })
    $('#edit-books-button').on('click', function () {
        $('.book-box.not-empty').toggleClass('currently-editing')
        $('#edit-books-button').toggleClass('currently-editing')
    })
    $('#add-books-button').on('click', function (){
        ipcRenderer.send('openBookChooserDialog')
    })
});

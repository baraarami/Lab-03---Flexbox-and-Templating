'use strict';
let picArr=[];//picArr
let findArr = [];
let arrayData=[];

function ShowPhoto (images){
  this.image_url=images.image_url;
  this.title=images.title;
  this.description=images.description;
  this.keyword=images.keyword;
  this.horns=images.horns;
  findArr.push(this.keyword);
  picArr.push(this);
}


//render function;
ShowPhoto.prototype.renderObj=function(){

  let template = $('#mustache-template').html();
  let mergedTemplate=Mustache.render(template,this);
  return mergedTemplate;
};


function getInfo(arr) {


  for (let i = 0; i < arr.length; i++) {
    if (arrayData.indexOf(arr[i]) === -1) {
      arrayData.push(arr[i]);
    }
  }

}


function selected(){
  $('select').append('<option value= "all" id= "option"> search by keywords</option>');

  for (let i=0 ; i<arrayData.length;i++){
    let option = $('#option').clone();
    $('select').append(option);
    option.html(arrayData[i]);
    option.removeAttr('id');
    option.attr('value' , arrayData[i]);

  }

  $('#select').on('change', function () {
    $('div').css({ 'display': 'none' });

    $('.' + this.value).css({ 'display': 'inline-block' });
  });
}


function sort1(arr) {
  arr.sort((a, b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()) {
      return -1;
    } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  return arr;
}

function sort2(arr) {
  arr.sort((a, b) => {
    if (a.horns < b.horns) {
      return -1;
    } else if (a.horns > b.horns) {
      return 1;
    }
    return 0;
  });
  return arr;
}




ShowPhoto.readJson1 = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings).then((data) => {

    sort1(data);

    data.forEach((element) => {
      let horn = new ShowPhoto (element);
      $('#Items').append(horn.renderObj());
    });
    getInfo(findArr);
    selected();
  });

};

ShowPhoto.readJson2 = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-2.json', ajaxSettings).then((data) => {

    sort2(data);

    data.forEach((element) => {
      let horn = new ShowPhoto(element);
      $('#Items').append(horn.renderObj());
    });
    getInfo(findArr);
    selected();
  });

};

///////////

$(() => ShowPhoto.readJson1());

function page1() {
  $('.all').remove();
  findArr = [];
  arrayData = [];
  $('option').remove();
  ShowPhoto.readJson1();
}

function page2() {
  $('.all').remove();
  findArr= [];
  arrayData = [];
  $('option').remove();
  ShowPhoto.readJson2();
}

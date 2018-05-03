function Pepper( options ){
  this.$options=options;
  var data=this.$data=this.$options.data;
  observe(data);
}

function observe(data) {
    for(var key in data){
        let value=data[key];
        
    }
}



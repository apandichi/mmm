


var nodeData = {
  "nodeData":{
     "id": uuidv4(),
     "topic":"Root node",
     "root":true,
     "children":[
        {
           "topic":"new node",
           "id":"8d3b98e54a7e8583",
           image: {
            url: 'https://raw.githubusercontent.com/ssshooter/mind-elixir-core/master/images/logo2.png', // required
            // you need to query the height and width of the image and calculate the appropriate value to display the image
            height: 90, // required
            width: 90, // required
          },
        }
     ],
     customData: {}
  }
};


let mind = new MindElixir({
  el: '#map',
  direction: MindElixir.LEFT,
  // or set as data that is return from `.getAllData()`
  // data: nodeData,
  draggable: true, 
  contextMenu: true,
  toolBar: true, 
  nodeMenu: true,
  keypress: true,
})
mind.init(nodeData)
console.log(mind)

var selectedNode = nodeData.nodeData;

mind.bus.addListener('selectNode', node => {
  selectedNode = node;
  console.log('selected node = ', node)
  $('#ex1').modal();
  const model = {
    nodeId: node.id,
    description: node.topic
  } 
  $("#rendered-form").view(model);


})

// Generate a random UUID
// const random_uuid = uuidv4();
  
// Print the UUID
// console.log(random_uuid);
  
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  const formDataObj = {};
  data.forEach((value, key) => (formDataObj[key] = value));
  console.log(formDataObj);

  console.log('node before = ', selectedNode)
  selectedNode.topic = formDataObj.description;
  console.log('node after = ', selectedNode)
  console.log('node data = ', nodeData)
  
  var x = {
    "nodeData":{
       "id":"8d3b2fec9511eb99",
       "topic":"new topic 3",
       "root":true,
       "children":[
          {
             "topic":"new node",
             "id":"8d3b98e54a7e8583"
          }
       ]
    }
  }

  mind.refresh(nodeData);
  $.modal.close();
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);


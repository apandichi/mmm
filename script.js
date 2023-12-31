
const styles = {
  new: { fontSize: '24', title: "New", code: 'new' },
  active: { fontSize: '24', color: '#ffffff', background: '#ffa500', title: "Active", code: "active" },
  resolved: { fontSize: '24', color: '#ffffff', background: '#8fce00', title: "Resolved", code: "resolved" },
  rootCause: { fontSize: '32', color: '#ffffff', background: '#db4c4c', title: "Root cause", code: "rootCause" },
}

var nodeData = {
  "nodeData":{
     "id": uuidv4(),
     "topic":"Root node",
     style: styles.new,
     "children":[]
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
  contextMenuOption: {
    focus: true,
    link: true,
    extend: [
      {
        name: 'Edit',
        onclick: () => {
          const menu = document.getElementsByClassName("context-menu")[0];
          menu.setAttribute("hidden", true);
          showModal();  
        },
      },

    ],
  },
})
mind.init(nodeData)
console.log('mind.init', mind)

mind.bus.addListener('selectNode', node => {
  console.log('selected node = ', node)
})

mind.bus.addListener('operation', operation => {
  console.log('operation', operation)
  if (operation.name === "addChild") {
      console.log('added child = ', operation.obj)
      operation.obj.style = styles.new;
  }
});

function addNewNode() {
  if (!mind.currentNode) {
    mind.selectNode(nodeData.nodeData.id); // select the root node
  }
  mind.addChild();
  showModal();
}

function showModal() {
  $('#ex1').modal();
  const selectedNode = mind.currentNode.nodeObj;
  const model = {
    nodeId: selectedNode.id,
    parent: selectedNode.parent ? selectedNode.parent.topic : "<none>",
    description: selectedNode.topic,
    team: selectedNode.team,
    department: selectedNode.department,
    datetime: selectedNode.datetime,
    attachment: selectedNode.attachment,
    status: selectedNode.style.code
  } 
  $("#rendered-form").view(model);
}
  
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
  console.log("formDataObj", formDataObj);

  const selectedNode = mind.currentNode.nodeObj;
  console.log('node before = ', selectedNode)
  selectedNode.topic = formDataObj.description;
  selectedNode.style = styles[formDataObj.status];
  selectedNode.team = formDataObj.team;
  selectedNode.datetime = formDataObj.datetime;
  selectedNode.department = formDataObj.department;
  selectedNode.attachment = formDataObj.attachment;
  selectedNode.image = formDataObj.attachment && formDataObj.attachment.type.startsWith("image/") ? {
    url: URL.createObjectURL(formDataObj.attachment),
    height: 90,
    width: 90,
  } : {},

  console.log('node after = ', selectedNode)
  console.log('node data = ', nodeData)


  mind.refresh(nodeData);
  $.modal.close();
  document.querySelector('form').reset();
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
form.reset();


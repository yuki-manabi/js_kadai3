const taskList = [];

document.addEventListener('DOMContentLoaded', () => {

    //追加ボタン押下時
    document.getElementById('btn_add').addEventListener('click', () => {
        
        const inputContent = document.getElementById('content').value;

        const addedTaskId = addTask(inputContent);
        if (addedTaskId === -1) {
            return;
        }
        document.getElementById('content').value = '';//追加後に入力を空にする

        showTask(addedTaskId);
    });
});

function addTask(inputContent) {
    //空の入力時
    if (inputContent === '') {
        console.log('input nothing');
        return -1;
    }

    const task = {
        content: inputContent,
        status: '作業中'
    };

    taskList.push(task);
    return taskList.length - 1;//配列の最後に追加されるため
}

function showTask(taskId) {
    const parentNode = document.getElementById('task-table');

    const trElement = document.createElement('tr');

    const tdIdElement = document.createElement('td');
    tdIdElement.textContent = taskId;
    trElement.appendChild(tdIdElement);

    const tdTaskElement = document.createElement('td');
    tdTaskElement.textContent = taskList[taskId].content;
    trElement.appendChild(tdTaskElement);

    //状態ボタンの作成とHTML作成
    const tdStatusElement = document.createElement('td');
    tdStatusElement.appendChild(showButton(taskList[taskId].status, taskId, changeStatus));
    trElement.appendChild(tdStatusElement);

    //削除ボタンの作成とHTML作成
    trElement.appendChild(showButton('削除', taskId, deleteTask));

    parentNode.appendChild(trElement);
}

function showButton(btnLabel, taskId, clickFunction) {
    const btnElement = document.createElement('button');
    btnElement.textContent = btnLabel;

    btnElement.addEventListener('click', () => {
        clickFunction(taskId);
    });
    return btnElement;
}

function deleteTask(taskId) {
    const parentNode = document.getElementById('task-table');

    for (let i = taskId; i < taskList.length; i++) {
        parentNode.removeChild(parentNode.lastChild);
    }
    
    taskList.splice(taskId, 1);
    for (let i = taskId; i < taskList.length; i++) {
        showTask(i);
    }
}

function changeStatus() {
    //状態変更
    console.log('change status');
}
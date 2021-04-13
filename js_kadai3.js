const taskList = [];

document.addEventListener('DOMContentLoaded', () => {

    //追加ボタン押下時
    document.getElementById('btn_add').addEventListener('click', () => {
        
        const inputContent = document.getElementById('content').value;

        const addedListNum = addTask(inputContent);
        if (addedListNum === -1) {
            return;
        }
        document.getElementById('content').value = '';//追加後に入力を空にする

        showTask(addedListNum);
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

function showTask(addedListNum) {
    const parentNode = document.getElementById('task-table');

    const trElement = document.createElement('tr');

    const tdIdElement = document.createElement('td');
    tdIdElement.textContent = addedListNum;
    trElement.appendChild(tdIdElement);

    const tdTaskElement = document.createElement('td');
    tdTaskElement.textContent = taskList[addedListNum].content;
    trElement.appendChild(tdTaskElement);

    //状態ボタンの作成とHTML作成
    const tdStatusElement = document.createElement('td');
    tdStatusElement.appendChild(showButton(taskList[addedListNum].status, addedListNum, changeStatus));
    trElement.appendChild(tdStatusElement);

    //削除ボタンの作成とHTML作成
    trElement.appendChild(showButton('削除', addedListNum, deleteTask));

    parentNode.appendChild(trElement);
}

function showButton(btnLabel, addedListNum, clickFunction) {
    const btnElement = document.createElement('button');
    btnElement.textContent = btnLabel;

    btnElement.addEventListener('click', () => {
        clickFunction(btnElement, addedListNum);
    });
    /*
    if (btnType === 'status') {
        //状態ボタン押下時
    } else if (btnType === 'delete') {
        //駆除ボタン押下時
        btnElement.addEventListener('click', () => {
            deleteTask(btnElement);
        });
    }
    */
    return btnElement;
}

function deleteTask(btnElement, taskID) {
    /*
    const btnDeleteElements = document.getElementsByClassName('delete');

    //押下した削除ボタンがどのToDoタスクのものか検索
    let taskID = 0;
    for (taskID = 0; taskID < btnDeleteElements.length; taskID++) {
        if (btnDeleteElements[taskID] === btnElement) {
            console.log('found'); 
            break;
        }
    }
    */
    taskList.splice(taskID, 1);
    btnElement.parentNode.remove();

    //タスクIDの振り直し
    const trElements = document.getElementsByTagName('tr');
    for (let i = taskID + 1; i < trElements.length; i++){
        trElements[i].firstElementChild.textContent = i - 1;
    }
}

function changeStatus() {
    //状態変更
    console.log('change status');
}
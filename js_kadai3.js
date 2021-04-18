const taskList = [];

document.addEventListener('DOMContentLoaded', () => {

    //初期テーブルの作成
    initialTable();

    //追加ボタン押下時
    document.getElementById('btn_add').addEventListener('click', () => {
        
        const inputContent = document.getElementById('content').value;

        const addedTaskId = addTask(inputContent);
        if (addedTaskId === -1) {
            return;
        }
        document.getElementById('content').value = '';//追加後に入力を空にする

        if (getRadioBtnChecked() !== 'done') { //完了選択時以外に追加タスクを表示する
            showTask(addedTaskId);
        }
    });

    //すべて 押下時
    document.getElementById('all').addEventListener('click', () => {
        filterTasks('すべて');
    });

    //作業中 押下時
    document.getElementById('in-progress').addEventListener('click', () => {
        filterTasks('作業中');
    });

    //完了 押下時
    document.getElementById('done').addEventListener('click', () => {
        filterTasks('完了');
    });
});

function initialTable() {
    const parentNode = document.getElementById('task-table');
    const trElement = document.createElement('tr');
    const thElement1 = document.createElement('th');
    thElement1.textContent = 'ID';
    const thElement2 = document.createElement('th');
    thElement2.textContent = 'コメント';
    const thElement3 = document.createElement('th');
    thElement3.textContent = '状態';
    trElement.appendChild(thElement1);
    trElement.appendChild(thElement2);
    trElement.appendChild(thElement3);
    parentNode.appendChild(trElement);
}

function getRadioBtnChecked() {
    const elements = document.getElementsByName('status');
    let radioChecked = 0;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            radioChecked = i;
        }
    }
    if (radioChecked === 0) {
        return 'all';
    } else if (radioChecked === 1) {
        return 'in-progress';
    } else {
        return 'done';
    }
}


function filterTasks(inputStatus) {
    const parentNode = document.getElementById('task-table');
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
    initialTable();
    for (let i = 0; i < taskList.length; i++) {
        if (inputStatus === 'すべて' || inputStatus === taskList[i].status) {
            showTask(i);
        }
    }

}

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
        clickFunction(btnElement, taskId);
    });
    return btnElement;
}

function deleteTask(btnElement, taskId) {
    const parentNode = document.getElementById('task-table');

    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
    taskList.splice(taskId, 1);
    initialTable();

    const radioChecked = getRadioBtnChecked();
    for (let i = 0; i < taskList.length; i++) {
        if (radioChecked === 'all') {
            showTask(i);
        } else if (taskList[i].status === '作業中' && radioChecked === 'in-progress') {
            showTask(i);
        } else if (taskList[i].status === '完了' && radioChecked === 'done') {
            showTask(i);
        }
    }
}

function changeStatus(btnElement, taskId) {
    const currectStatus = taskList[taskId].status;
    if (currectStatus === '作業中') {
        taskList[taskId].status = '完了';
        btnElement.textContent = '完了';
    } else {
        taskList[taskId].status = '作業中';
        btnElement.textContent = '作業中';
    }
    if (getRadioBtnChecked() !== 'all') {
        btnElement.parentNode.parentNode.remove();
    }
}
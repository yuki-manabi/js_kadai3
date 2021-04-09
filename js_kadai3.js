let taskList = [];

document.addEventListener('DOMContentLoaded', () => {

    //追加ボタン押下時
    document.getElementById('btn_add').addEventListener('click', () => {
        
        let inputContent = document.getElementById('content').value;

        let addedListNum = addTask(inputContent);
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
    tdStatusElement.appendChild(showStatusButton(addedListNum));
    trElement.appendChild(tdStatusElement);

    //削除ボタンの作成とHTML作成
    trElement.appendChild(showDeleteButton(addedListNum));

    parentNode.appendChild(trElement);
}

function showStatusButton(addedListNum) {
    const btnProgressElement = document.createElement('button');
    btnProgressElement.textContent = taskList[addedListNum].status;
    return btnProgressElement;
}

function showDeleteButton() {
    const btnDeleteElement = document.createElement('button');
    btnDeleteElement.textContent = '削除';
    return btnDeleteElement;
}
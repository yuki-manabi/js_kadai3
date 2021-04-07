document.addEventListener('DOMContentLoaded', () => {

    const parentNode = document.getElementById('task-table');
    let taskID = 0;

    //追加ボタン押下時
    document.getElementById('btn_add').addEventListener('click', () => {

        const trElement = document.createElement('tr');
        let task = document.getElementById('task').value;

        //空の入力時
        if (task === '') {
            console.log('input nothing');
            return;
        }

        const tdIdElement = document.createElement('td');
        tdIdElement.textContent = taskID++;
        trElement.appendChild(tdIdElement);

        const tdTaskElement = document.createElement('td');
        tdTaskElement.textContent = task;
        trElement.appendChild(tdTaskElement);

        const tdStatusElement = document.createElement('td');
        const btnProgressElement = document.createElement('button');
        btnProgressElement.textContent = '作業中';
        tdStatusElement.appendChild(btnProgressElement);
        trElement.appendChild(tdStatusElement);

        const btnDeleteElement = document.createElement('button');
        btnDeleteElement.textContent = '削除';
        trElement.appendChild(btnDeleteElement);

        parentNode.appendChild(trElement);

        document.getElementById('task').value = '';//追加後に入力を空にする
    });
});
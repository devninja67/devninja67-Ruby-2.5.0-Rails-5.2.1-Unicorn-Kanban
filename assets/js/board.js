(function () {

    function handleItemDragStart(e)
    {
        this.style.opacity = '0.4';

        dragSrcItem = this;
        dragSrcColumn = this.parentNode;

        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', this.innerHTML);
    }

    function handleItemDragEnd(e)
    {
        // Restore styles
        removeOver();
        this.style.opacity = '1.0';

        dragSrcColumn = null;
        dragSrcItem = null;
    }

    function handleItemDragOver(e)
    {
        if (e.preventDefault) e.preventDefault();

        e.dataTransfer.dropEffect = 'copy';

        return false;
    }

    function handleItemDragEnter(e)
    {
        if (dragSrcItem != this) {
            removeOver();
            this.classList.add('over');
        }
    }

    function handleItemDrop(e)
    {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        // Drop the element if the item is not the same
        if (dragSrcItem != this) {

            var position = getItemPosition(this);
            var item = createItem(e.dataTransfer.getData('text/plain'));

            if (countColumnItems(this.parentNode) == position) {
                this.parentNode.appendChild(item);
            }
            else {
                this.parentNode.insertBefore(item, this);
            }

            dragSrcItem.parentNode.removeChild(dragSrcItem);

            saveBoard();
        }

        dragSrcColumn = null;
        dragSrcItem = null;

        return false;
    }


    function handleColumnDragOver(e)
    {
        if (e.preventDefault) e.preventDefault();

        e.dataTransfer.dropEffect = 'copy';

        return false;
    }

    function handleColumnDragEnter(e)
    {
        if (dragSrcColumn != this) {
            removeOver();
            this.classList.add('over');
        }
    }

    function handleColumnDrop(e)
    {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        // Drop the element if the column is not the same
        if (dragSrcColumn != this) {

            var item = createItem(e.dataTransfer.getData('text/plain'));
            this.appendChild(item);
            dragSrcColumn.removeChild(dragSrcItem);

            saveBoard();
        }

        return false;
    }

    function saveBoard()
    {
        var data = [];
        var projectId = document.getElementById("board").getAttribute("data-project-id");
        var cols = document.querySelectorAll('.column');

        [].forEach.call(cols, function(col) {

            [].forEach.call(col.children, function(item) {

                data.push({
                    "task_id": item.firstElementChild.getAttribute("data-task-id"),
                    "position": getItemPosition(item),
                    "column_id": col.getAttribute("data-column-id")
                })
            });
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "?controller=board&action=save&project_id=" + projectId, true);
        xhr.send(JSON.stringify(data));
    }

    function getItemPosition(element)
    {
        var i = 0;

        while ((element = element.previousSibling) != null) {

            if (element.nodeName == "DIV" && element.className == "draggable-item") {
                i++;
            }
        }

        return i + 1;
    }

    function countColumnItems(element)
    {
        return element.children.length;
    }

    function createItem(html)
    {
        var item = document.createElement("div");
        item.className = "draggable-item";
        item.draggable  = true;
        item.innerHTML = html;
        item.ondragstart = handleItemDragStart;
        item.ondragend = handleItemDragEnd;
        item.ondragenter = handleItemDragEnter;
        item.ondragover = handleItemDragOver;
        item.ondrop = handleItemDrop;

        return item;
    }

    function removeOver()
    {
        // Remove column over
        [].forEach.call(document.querySelectorAll('.column'), function (col) {
            col.classList.remove('over');
        });

        // Remove item over
        [].forEach.call(document.querySelectorAll('.draggable-item'), function (item) {
            item.classList.remove('over');
        });
    }

    var dragSrcItem = null;
    var dragSrcColumn = null;

    var items = document.querySelectorAll('.draggable-item');

    [].forEach.call(items, function(item) {
        item.addEventListener('dragstart', handleItemDragStart, false);
        item.addEventListener('dragend', handleItemDragEnd, false);
        item.addEventListener('dragenter', handleItemDragEnter, false);
        item.addEventListener('dragover', handleItemDragOver, false);
        item.addEventListener('drop', handleItemDrop, false);
    });

    var cols = document.querySelectorAll('.column');

    [].forEach.call(cols, function(col) {
        col.addEventListener('dragenter', handleColumnDragEnter, false);
        col.addEventListener('dragover', handleColumnDragOver, false);
        col.addEventListener('drop', handleColumnDrop, false);
    });

}());
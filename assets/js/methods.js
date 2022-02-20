export default ((_) => {
    Node.prototype.appendFullElement = function (el, text = "", attr = []) {
        const element = document.createElement(el);
        const content = document.createTextNode(text);

        this.appendChild(element);
        element.appendChild(content);
        attr.forEach((item) => {
            element.setAttribute(item[0], item[1]);
        });
    };

    Node.prototype.appendCard = function (
        img,
        title,
        paragraphs = [],
        listGroupItems = []
    ) {
        const resultado = this;

        this.appendFullElement("article", "", [
            ["class", "card m-3"],
            ["id", `card`],
        ]);
        const card = document.querySelector(`#card`);
        
        card.appendFullElement("div", "", [["class", "row"]])

        const cardRow = document.querySelector("#card>.row")
        
        cardRow.appendFullElement("div", "", [["class", "col-4"]])

        const cardImgDiv = document.querySelector("#card>.row>.col-4")
        
        cardImgDiv.appendFullElement("img", "", [
            ["src", img],
            ["class", "card-img col-4"],
        ]);

        
        cardRow.appendFullElement("div", "", [["class", "col-8"]]);
        
        const cardCol = document.querySelector("#card>.row>.col-8")

        cardCol.appendFullElement("div", "", [["class", "card-body"]]);

        const cardBody = document.querySelector("#card .card-body");

        cardBody.appendFullElement("h3", title, [["class", "card-title"]]);
        
        paragraphs.forEach((item) => {
            cardBody.appendFullElement("p", item, [["class", "card-text"]]);
        });

        cardCol.appendFullElement("ul", "", [["class", "list-group list-group-flush"]]);

        const cardListGroup = document.querySelector("#card ul.list-group");

        listGroupItems.forEach((item) => {
            cardListGroup.appendFullElement("li", item, [
                ["class", "list-group-item"],
            ]);
        });
    };
})();

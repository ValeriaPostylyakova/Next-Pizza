export const ingredients = [
    {
        name: 'Сырный бортик',
        price: 179,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    },
    {
        name: 'Сливочная моцарелла',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    },
    {
        name: 'Сыры чеддер и пармезан',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
    },
    {
        name: 'Острый перец халапеньо',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
    },
    {
        name: 'Нежный цыпленок',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    },
    {
        name: 'Шампиньоны',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    },
    {
        name: 'Бекон',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F',
    },
    {
        name: 'Ветчина',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    },
    {
        name: 'Пикантная пепперони',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    },
    {
        name: 'Острая чоризо',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    },
    {
        name: 'Маринованные огурчики',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    },
    {
        name: 'Свежие томаты',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    },
    {
        name: 'Красный лук',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    },
    {
        name: 'Сочные ананасы',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    },
    {
        name: 'Итальянские травы',
        price: 39,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    },
    {
        name: 'Сладкий перец',
        price: 59,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    },
    {
        name: 'Кубики брынзы',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    },
    {
        name: 'Митболы',
        price: 79,
        imageUrl:
            'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const categories = [
    { name: 'Пиццы' },
    { name: 'Завтрак' },
    { name: 'Комбо' },
    { name: 'Коктейли' },
    { name: 'Кофе' },
    { name: 'Десерты' },
];

export const products = [
    {
        name: 'Омлет с ветчиной и грибами',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
        categoryId: 2,
        title: '1 шт, 160 г',
        description: `Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла в пшеничной пите. Удобно взять с собой`,
    },
    {
        name: 'Омлет с пепперони',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
        categoryId: 2,
        title: '1 шт, 110 г',
        description: `Для тех, кто не пропускает завтраки — омлет с поджаристой корочкой, пикантная пепперони, томаты и моцарелла в пшеничной пите. Удобно взять с собой`,
    },
    {
        name: 'Дэнвич ветчина и сыр',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
        categoryId: 3,
        title: '1 шт, 160 г',
        description: `Горячий завтрак с ветчиной, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке`,
    },
    {
        name: 'Куриные наггетсы',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
        categoryId: 3,
        description: `Нежное куриное мясо в хрустящей панировке`,
    },
    {
        name: 'Картофель из печи с соусом 🌱',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
        categoryId: 3,
        title: 'Стандартная, 80 г',
        description: `Запеченная в печи картошечка — привычный вкус и мало масла. В составе пряные специи`,
    },
    {
        name: 'Додстер',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
        categoryId: 3,
        title: '1 шт, 210 г',
        description: `Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке`,
    },
    {
        name: 'Острый Додстер 🌶️🌶️',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
        categoryId: 3,
        title: '1 шт, 190 г',
        description: `Горячая закуска с цыпленком, перчиком халапеньо, маринованными огурчиками, томатами, моцареллой и соусом барбекю в тонкой пшеничной лепешке`,
    },
    {
        name: 'Молочный коктейль с печеньем Орео',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
        categoryId: 4,
        title: '0.3 л, 320 г',
        description: `То самое печенье «Орео» в удобном формате ледяного милкшейка`,
    },
    {
        name: 'Классический молочный коктейль 👶',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
        categoryId: 4,
        title: '0.3 л, 280 г',
        description: `Это классика: молоко, мороженое и ничего лишнего`,
    },
    {
        name: 'Ирландский Капучино',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
        categoryId: 5,
        title: '0.4 л, 250 г',
        description: `Легендарный рецепт кофе: эспрессо, горячее молоко и плотная молочная пенка`,
    },
    {
        name: 'Кофе Карамельный капучино',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
        categoryId: 5,
        title: '0.3 л, 239 г',
        description: `Классический капучино с молочной пенкой и карамельным сиропом`,
    },
    {
        name: 'Кофе Кокосовый латте',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
        categoryId: 5,
        title: '0.3 л, 300 г',
        description: `Горячий латте с кокосовым сиропом`,
    },
    {
        name: 'Кофе Американо',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
        categoryId: 5,
        title: '0.4 л, 380 г',
        description: `Горячий кофе для ценителей чистого вкуса
`,
    },
    {
        name: 'Кофе Латте',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
        categoryId: 5,
        title: '0.4 л, 330 г',
        description: `Идеально сбалансированное сочетание кофе, увеличенной порции молока и нежнейшей пенки`,
    },
];

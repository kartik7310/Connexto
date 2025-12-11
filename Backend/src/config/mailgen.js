  import Mailgen from "mailgen"
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Connexeto',
        link: 'https://connexeto.com/'
    }
});
export default mailGenerator;
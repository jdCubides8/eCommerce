function sendEmail(name,email,adress,message) {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "glorioustastefactory@gmail.com",
        Password : "A5C4555B9BAF961ED47CD4ED9B4ACD0041BF",
        To : `${email}, glorioustastefactory@gmail.com`,
        From : "glorioustastefactory@gmail.com",
        Subject : ` Gracias ${name} por comprar con nosotros`,
        Body : `Tu compra de ${message} se ha realizado exitosamente y esperamos entregartelo lo mas pronto posible en la direccion ${adress}.`
    })
}

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendWelcomeMail = async (
	to: string,
	url: string,
	username: string
) => {
	const config = {
		to: to,
		from: 'test@yopmail.com',
		subject: 'Seja Bem Vindo!',
		text: 'Verifique sua conta para ter acesso a todas as funções disponíveis',
		templateId: 'd-5aed6728b3d54b99b7815111f8d68108',
		html: 'Seja Bem Vindo!',
		dynamicTemplateData: {
			url,
			username,
		},
	};

	await sendgrid.send(config);
};

import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import Spinner from '../Spinner';
import Modal from '../Modal';
import './feedbackform.scss';

const FeedbackForm = () => {
  const form = useRef();
  const modal = useRef();
  const name = useRef();
  const address = useRef();
  const tel = useRef();
  const ad = useRef();
  const text = useRef();

  const [loading, setLoading] = useState(false);
  const [raiting, setRaiting] = useState(3);

  const phoneRegExp = /^((\+38|)+([0-9]){10})$/;
  const nameRegExp =
    /^([a-zA-Zа-яА-ЯіІїЇєЄ]+\s?)+([a-zA-Zа-яА-ЯіІїЇєЄ]+-?[a-zA-Zа-яА-ЯіІїЇєЄ]+\s?)*$/;

  const showModal = () => {
    modal.current.classList.add('show');
    setTimeout(() => {
      modal.current.classList.remove('show');
    }, 3000);
  };

  const raitingHandler = (event, newRaiting) => {
    if (!newRaiting) {
      setRaiting(0);
    } else {
      setRaiting(newRaiting);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (
      !form.current.name.value ||
      !form.current.address.value ||
      !form.current.tel.value ||
      !form.current.ad.value ||
      !form.current.text.value
    ) {
      alert('Будь ласка, заповніть форму');
      return;
    }

    if (
      name.current.children[2] ||
      address.current.children[2] ||
      tel.current.children[2] ||
      ad.current.children[3] ||
      text.current.children[2]
    ) {
      alert('Будь ласка, заповніть коректно поля');
      return;
    }

    setLoading(true);
    const response = await emailjs.sendForm(
      'service_t9e135w',
      'template_kq4nn7u',
      form.current,
      'v9q1y1jNay2FbVapM'
    );

    try {
      showModal();
      setLoading(false);
      form.current.reset();
      setRaiting(3);
      console.log(response.text);
    } catch (error) {
      alert('Щось пішло не так, спробуйте пізніше.');
      setLoading(false);
      console.log(error.text);
    }
  };

  return (
    <main>
      <Formik
        initialValues={{
          raiting,
          name: '',
          address: '',
          tel: '',
          ad: '',
          text: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Мінімум 2 символи!')
            .required('Будь ласка, заповніть це поле')
            .matches(nameRegExp, 'Некоректно введене ім`я'),
          tel: Yup.string()
            .required('Будь ласка, заповніть це поле')
            .matches(phoneRegExp, 'Некоректний номер телефону'),
          address: Yup.string()
            .min(2, 'Мінімум 2 символи!')
            .required('Будь ласка, заповніть це поле'),
          ad: Yup.string().required('Будь ласка, виберіть один варіант!'),
          text: Yup.string().min(10, 'Мінімум 10 символів!'),
        })}
      >
        <Form ref={form} className="form" onSubmit={sendEmail}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                '& > legend': { mt: 2 },
                gap: '12px',
                transform: 'translate(0, -40px)',
              }}
            >
              <Rating
                name="raiting"
                value={raiting}
                size="large"
                sx={{ fontSize: '36px' }}
                onChange={(event, newRaiting) =>
                  raitingHandler(event, newRaiting)
                }
              />
              <Typography
                component="legend"
                sx={{ fontSize: '18px', fontWeight: '600' }}
              >
                ЗАГАЛЬНЕ ВРАЖЕННЯ
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              sx={{
                maxWidth: '770px',
                padding: '0 20px 0 20px',
                marginBottom: '50px',
              }}
            >
              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={name}
                >
                  <label htmlFor="name">Ім`я</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Олександр"
                  />
                  <ErrorMessage className="error" name="name" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={address}
                >
                  <label htmlFor="address">Адреса доставки</label>
                  <Field
                    id="address"
                    name="address"
                    type="text"
                    placeholder="вул. Незалежності 1"
                  />
                  <ErrorMessage
                    className="error"
                    name="address"
                    component="div"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={tel}
                >
                  <label htmlFor="tel">Телефон</label>
                  <Field
                    id="tel"
                    name="tel"
                    type="tel"
                    placeholder="+380681234567 або 0681234567"
                  />
                  <ErrorMessage className="error" name="tel" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={ad}
                >
                  <label htmlFor="ad">Звідки про нас дізналися?</label>
                  <div className="select-wrapper">
                    <Field id="ad" name="ad" as="select">
                      <option value="">Вибрати</option>
                      <option value="Від друзів">Від друзів</option>
                      <option value="Зовнішня реклама">Зовнішня реклама</option>
                      <option value="Інтернет реклама">Інтернет реклама</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="TikTok">TikTok</option>
                    </Field>
                  </div>
                  <ErrorMessage className="error" name="ad" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px' }}
                  ref={text}
                >
                  <label htmlFor="text">Ваш відгук</label>
                  <Field
                    id="text"
                    name="text"
                    as="textarea"
                    placeholder="Як вам наш сервіс сьогодні?"
                  />
                  <ErrorMessage className="error" name="text" component="div" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{ gap: '8px', marginTop: '10px' }}
                >
                  {!loading ? (
                    <Button
                      variant="contained"
                      type="submit"
                      className="submit-btn"
                    >
                      ЗАЛИШИТИ ВІДГУК
                    </Button>
                  ) : (
                    <Box display="flex" justifyContent="center">
                      <Spinner />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </Formik>
      <Modal ref={modal} />
    </main>
  );
};

export default FeedbackForm;

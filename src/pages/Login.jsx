import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as userActions from '../actions/userActions';

const mockUser = 'ramsses@email.com';
const mockPassword = '123456';

const formSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Minimo 2 caracteres')
    .max(6, 'Maximo 6 caracteres')
    .required('Required'),
  email: Yup.string().email('Email incorrecto').required('Required'),
});

const Login = (props) => {

  const authenticate = ({ email, password }, actions) => {
    if (email !== mockUser){
      actions.setFieldError('email', 'Email incorrecto');
      actions.setSubmitting(false);
    }
    if (password !== mockPassword) {
      actions.setFieldError('email', 'Password incorrecto');
      actions.setSubmitting(false);
    }
    props.setUser(email, props.history);
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Iniciar Sesion
        </Header>
        <Formik
          validateOnChange={false}
          initialValues={{ email: '', password: '' }}
          validationSchema={formSchema}
          onSubmit={(values, actions) => authenticate(values, actions)}
        >
          {props => (
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  error={props?.errors?.email ? {
                    content: 'Email incorrecto',
                  } : false}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                  name='email'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  error={props?.errors?.password ? {
                    content: 'Password incorrecto',
                  } : false}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                  name='password'
                />
    
                <Button color='teal' fluid size='large' onClick={props.handleSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
          )}
        </Formik>
      </Grid.Column>
    </Grid>
  );
}

const mapStateToProps = ({ userReducer }) => {
  return { user: userReducer };
};

const mapDispatchToProps = {
  ...userActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
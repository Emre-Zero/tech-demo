## Live demo site: [stripe.emre.earth](https://stripe.emre.earth)

---

### Test info
- Billing address: `random`
- Card `4242 4242 4242 4242` (visa)
- Card Expiration: `any valid future date`
- Card security code: `any 3 digit`
- ZIP Code: `any six digit`
- Discount code: `DEMO20` for 20% off

---

### Tech notes

- [Ne<ins>s</ins>tJS](https://nestjs.com) as backend NodeJS framework
- [Ne<ins>x</ins>tJS](https://nextjs.org) as frontend React framework
- [React](https://reactjs.org)
- [Redux](https://redux.js.org) + [Redux Toolkit](https://redux-toolkit.js.org) for state management
- [Typescript](https://www.typescriptlang.org)
- [NextUI](https://nextui.org) for UI components
- [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup) for form validation
- Started with [this template](https://github.com/thisismydesign/nestjs-starter).

### What can be improved
- Harden validation for API endpoints
- Display total subscription amount with tax included in frontend
- Add user authentication, database integration
- Add tests with Jest
- Improve overall frontend UX/UI
- State input should be a dropdown (not supported yet by NextUI)

---

To build locally:

```sh
cp .env.example .env
# update values in .env
docker-compose up
```

http://localhost:3000

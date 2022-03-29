### Live version: https://em-stripe-demo.herokuapp.com

### Test info
- Billing address: `random`
- Card `4242 4242 4242 4242` (visa)
- Card Expiration: `any valid future date`
- Card security code: `any 3 digit`
- ZIP Code: `any six digit`
- Discount code: `DEMO20` for 20% off

---

### Tech notes

- [Ne<ins>s</ins>tJS](https://nestjs.com) for backend/API framework
- [Ne<ins>x</ins>tJS](https://nextjs.org) for frontend React framework
- [Typescript](https://www.typescriptlang.org)
- [NextUI](https://nextui.org)
- [React Hook Form](https://react-hook-form.com) + [Yup](https://github.com/jquense/yup) for form validation
- Started with [this template](https://github.com/thisismydesign/nestjs-starter).

### What can be improved
- State input should be a dropdown, but NextUI doesn't support dropdowns yet
- Hardening validation for API endpoints
- Display total subscription amount with tax included in frontend
- Adding user authentication, database integration
- Can extract components inside checkout.tsx
- Add more comments to code
- Add tests for Jest
- Upgrade packages to latest versions

---

To build locally:

```sh
cp .env.example .env
# update values in .env
docker-compose up
```

http://localhost:3000

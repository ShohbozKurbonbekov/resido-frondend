### Zod

- zod is a TypeScript-first schema validation library. It lets you define shapes of objects and enforce rules.

# z.string().min(2, { message: "Must be at least 2 characters." })

- Here z.string() means the value must be a string, and .min(2) requires at least 2 characters. The message is what the user sees if validation fails.
- z.object({...}) defines a full object schema — in your case, your form fields.

### react-hook-form and useForm()

- react-hook-form is a library to manage forms in React with minimal re-renders.
- useForm is the hook you use to create a form instance:

# const form = useForm<z.infer<typeof FormSchema>>({

resolver: zodResolver(FormSchema),
defaultValues: { fullname: "", email: "", ... }
})

- z.infer<typeof FormSchema> automatically extracts TypeScript types from your Zod schema — so your form knows exactly what type each field is.
- resolver: zodResolver(FormSchema) connects Zod validation with React Hook Form.

### zodResolver

- From @hookform/resolvers/zod.
- It links Zod and React Hook Form: any validation rules you define in Zod will automatically run when a user submits the form.

  - Without it, React Hook Form wouldn't know about your Zod validation.

  # {...field}

  - field comes from React Hook Form and contains properties like value, onChange, onBlur, which are needed for controlled inputs.

### regex() in Zod

- z.string().regex(/^[0-9+\-\s()]\*$/, { message: "Invalid phone" })
- Ensures the string matches a pattern.
- Example: only numbers, +, -, spaces, and parentheses for phone numbers.

### .optional()

- Marks the field as not required

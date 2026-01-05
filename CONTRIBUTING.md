# Contributing to AI Thumbnail Generator

Thank you for your interest in contributing to the AI Thumbnail Generator! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ai-thumbnail-generator.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local configuration
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Code Style

- Use ES6+ JavaScript features
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Commit Messages

- Use clear and descriptive commit messages
- Start with a verb in present tense (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Add detailed description if needed

Examples:
- `Add user profile page`
- `Fix authentication bug in login flow`
- `Update README with deployment instructions`

## Pull Request Guidelines

1. **Description**: Provide a clear description of the changes
2. **Testing**: Ensure all tests pass (if applicable)
3. **Documentation**: Update documentation if needed
4. **Screenshots**: Add screenshots for UI changes
5. **Breaking Changes**: Clearly mark any breaking changes

## Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

## Feature Requests

We welcome feature requests! Please:
- Check if the feature already exists
- Provide a clear use case
- Explain why it would be valuable
- Consider if it fits the project scope

## Code Review Process

1. At least one maintainer will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged

## Areas for Contribution

- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements
- Performance optimizations
- Test coverage
- Accessibility improvements

## Questions?

If you have questions, feel free to:
- Open an issue
- Reach out to maintainers

Thank you for contributing!

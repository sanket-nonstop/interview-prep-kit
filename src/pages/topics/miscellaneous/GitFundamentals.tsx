import { TopicLayout } from '@/components/TopicLayout';

const GitFundamentals = () => {
  return (
    <TopicLayout
      title="Git Fundamentals"
      route="/miscellaneous/git/fundamentals"
      category="javascript"
      explanation="Git is a distributed version control system. Understanding basic commands, the staging area, and commit history is essential for any developer role."
      code={`# Initialize repository
git init

# Check status
git status

# Stage files
git add file.js          # Stage specific file
git add .                # Stage all changes

# Commit changes
git commit -m "Add feature"

# View history
git log
git log --oneline        # Compact view

# View changes
git diff                 # Unstaged changes
git diff --staged        # Staged changes

# Undo changes
git restore file.js      # Discard unstaged changes
git restore --staged file.js  # Unstage file
git reset HEAD~1         # Undo last commit (keep changes)
git reset --hard HEAD~1  # Undo last commit (discard changes)

# Remote operations
git remote add origin <url>
git push origin main
git pull origin main
git clone <url>`}
      codeLanguage="bash"
      whyItMatters="Git is used in every professional development environment. Interviewers expect you to know basic commands, understand the staging area, and handle common scenarios like undoing changes."
      mistakes={[
        'Committing directly without reviewing staged changes',
        'Using git reset --hard without understanding data loss',
        'Not writing meaningful commit messages',
        'Confusing git pull with git fetch',
      ]}
      practiceTask="Explain the difference between git reset, git revert, and git restore. When would you use each?"
    />
  );
};

export default GitFundamentals;

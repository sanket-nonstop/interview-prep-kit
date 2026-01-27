import { TopicLayout } from '@/components/TopicLayout';

export const GitBranching = () => (
  <TopicLayout title="Branching & Merging" route="/miscellaneous/git/branching" category="javascript"
    explanation="Branches allow parallel development. Merging combines changes from different branches. Understanding merge strategies is crucial for team collaboration."
    code={`# Create and switch to new branch
git checkout -b feature/new-feature
# or
git branch feature/new-feature
git checkout feature/new-feature

# List branches
git branch              # Local branches
git branch -r           # Remote branches
git branch -a           # All branches

# Merge branch into current branch
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature    # Safe delete
git branch -D feature/new-feature    # Force delete

# Merge strategies
git merge --no-ff feature/branch     # Create merge commit
git merge --squash feature/branch    # Squash all commits into one

# Resolve conflicts
# 1. Git marks conflicts in files
# 2. Edit files to resolve
# 3. git add <resolved-files>
# 4. git commit`}
    whyItMatters="Branching is fundamental to Git workflows. Interviewers test your understanding of merge conflicts, strategies, and best practices."
    mistakes={['Merging without pulling latest changes', 'Not testing before merging to main', 'Deleting branches with unmerged changes', 'Not understanding fast-forward vs 3-way merge']}
    practiceTask="Explain the difference between git merge and git rebase. When would you use each?" />
);

export const GitRebase = () => (
  <TopicLayout title="Rebase & Cherry-pick" route="/miscellaneous/git/rebase" category="javascript"
    explanation="Rebase rewrites commit history by moving commits to a new base. Cherry-pick applies specific commits from one branch to another."
    code={`# Rebase current branch onto main
git checkout feature/branch
git rebase main

# Interactive rebase (edit last 3 commits)
git rebase -i HEAD~3
# Options: pick, reword, edit, squash, fixup, drop

# Continue after resolving conflicts
git rebase --continue
git rebase --abort    # Cancel rebase

# Cherry-pick specific commit
git cherry-pick abc123def

# Cherry-pick range of commits
git cherry-pick abc123..def456

# Rebase vs Merge
# Merge: Preserves history, creates merge commit
# Rebase: Linear history, rewrites commits

# Golden Rule: Never rebase public/shared branches!`}
    whyItMatters="Rebase creates clean, linear history. Understanding when to rebase vs merge shows Git mastery. Common in code reviews."
    mistakes={['Rebasing public branches', 'Not understanding rebase rewrites history', 'Force pushing without --force-with-lease', 'Using rebase when merge is safer']}
    practiceTask="You have 5 messy commits on a feature branch. How would you clean them up before merging?" />
);

export const GitWorkflows = () => (
  <TopicLayout title="Git Workflows" route="/miscellaneous/git/workflows" category="javascript"
    explanation="Git workflows define how teams collaborate. Common workflows: Git Flow, GitHub Flow, Trunk-Based Development."
    code={`# GitHub Flow (Simple)
1. Create branch from main
2. Make changes and commit
3. Open Pull Request
4. Review and discuss
5. Merge to main
6. Deploy

# Git Flow (Complex)
main (production)
develop (integration)
feature/* (new features)
release/* (release prep)
hotfix/* (urgent fixes)

# Feature branch workflow
git checkout -b feature/user-auth
# ... make changes ...
git push origin feature/user-auth
# Create PR on GitHub
# After review: merge to main

# Trunk-Based Development
- Short-lived branches (< 1 day)
- Frequent integration to main
- Feature flags for incomplete features

# Best Practices
- Small, focused commits
- Descriptive commit messages
- Pull before push
- Review before merge
- Delete merged branches`}
    whyItMatters="Understanding workflows shows you can work in a team. Interviewers ask about PR process, code review, and branching strategies."
    mistakes={['Long-lived feature branches', 'Committing directly to main', 'Not writing meaningful commit messages', 'Not syncing with remote regularly']}
    practiceTask="Design a Git workflow for a team of 5 developers working on a web app. Consider: feature development, code review, releases, hotfixes." />
);

export default { GitBranching, GitRebase, GitWorkflows };

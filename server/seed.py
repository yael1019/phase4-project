import random
import string
from app import app, bcrypt
from models import db, User, Article, Category
from faker import Faker

fake = Faker()
# app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

def generate_password():
    # password = ''.join(random.choice(string.ascii_lowercase) for _ in range(7))
    # password += random.choice(string.ascii_uppercase)
    passwords = [
        'Kuqidgam',
        'Wjzxaphr',
        'Wbuguwcb',
        'Sugwaydr',
        'Spnqhbve',
        'Ecpfebwz',
        'Rjywzjjn',
        'Lcyeuaza',
        'Eicnvzaw',
        'Ikuzqjpy'
    ]
    passwords_hash = []
    for pas in passwords:
        password_hash = bcrypt.generate_password_hash(pas).decode('utf-8')
        print('creating password hash')
        passwords_hash.append(password_hash)
    return passwords_hash

def seed_users():
    passwords = generate_password()
    for i in range(10):
        name = fake.name()
        username = fake.user_name() 
        user = User(name=name, username=username, password=passwords[i])
        db.session.add(user)
    db.session.commit()

def seed_categories():
    categories = ["Travel", "Cooking", "Sports", "Tech", "Money", "Business"]
    for category_name in categories:
        category = Category(name=category_name)
        db.session.add(category)
    db.session.commit()

def seed_articles():
    users = User.query.all()
    categories = Category.query.all()
    for user in users:
        for _ in range(random.randint(2, 5)):
            title = fake.sentence()
            for _ in range(100):
                text = fake.paragraph(nb_sentences=100)
            # text = fake.text()
            category = random.choice(categories)
            article = Article(title=title, text=text, user_id=user.id, category_id=category.id)
            db.session.add(article)
    db.session.commit()

def clear_data():
    # db.session.execute('DELETE FROM users;')
    # db.session.execute('DELETE FROM categories;')
    # db.session.execute('DELETE FROM articles;')
    User.query.delete()
    Article.query.delete()
    Category.query.delete()
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        clear_data()
        seed_users()
        seed_categories()
        seed_articles()
